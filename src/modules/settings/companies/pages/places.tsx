import React, { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { AppHeader } from '@/modules/shared/components/headers';
import { AppFooter } from '@/modules/shared/components/footers';
import { companyService } from '../services/company.service';
import { Card, Container, Row, Col, Alert, Badge, Pagination, Button } from 'react-bootstrap';
import { AddCompanyModal } from '../components';
import type { Company } from '../types/company.types';

const ITEMS_PER_PAGE = 10;

export const PlacesPage: React.FC = () => {
  const [selectedCompany, setSelectedCompany] = useState<Company | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [showAddModal, setShowAddModal] = useState(false);

  const { data: companies, isLoading, error } = useQuery({
    queryKey: ['companies'],
    queryFn: companyService.getCompanies
  });

  // Selecionar primeira company por padrão quando os dados carregarem
  useEffect(() => {
    if (companies && companies.length > 0 && !selectedCompany) {
      setSelectedCompany(companies[0]);
    }
  }, [companies, selectedCompany]);

  // Calcular paginação
  const totalPages = companies ? Math.ceil(companies.length / ITEMS_PER_PAGE) : 0;
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const currentCompanies = companies ? companies.slice(startIndex, endIndex) : [];

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleCompanySelect = (company: Company) => {
    setSelectedCompany(company);
  };

  if (isLoading) {
    return (
      <>
        <AppHeader />
        <Container className="py-4">
          <div className="text-center">
            <div className="spinner-border" role="status">
              <span className="visually-hidden">Carregando...</span>
            </div>
          </div>
        </Container>
        <AppFooter />
      </>
    );
  }

  if (error) {
    return (
      <>
        <AppHeader />
        <Container className="py-4">
          <Alert variant="danger">
            Erro ao carregar os locais. Tente novamente mais tarde.
          </Alert>
        </Container>
        <AppFooter />
      </>
    );
  }

  return (
    <>
      <AppHeader />
      <Container fluid className="py-4">
        <h1 className="mb-4">Locais de Atendimento</h1>
        
        <Row>
          {/* Sidebar - 1/3 da tela */}
          <Col md={4}>
            <Card>
              <Card.Header>
                <h5 className="mb-0">Detalhes do Local</h5>
              </Card.Header>
              <Card.Body>
                {selectedCompany ? (
                  <>
                    <Row className="mb-3">
                      <Col sm={4} className="fw-bold">Nome:</Col>
                      <Col sm={8}>{selectedCompany.name}</Col>
                    </Row>
                    <Row className="mb-3">
                      <Col sm={4} className="fw-bold">Razão Social:</Col>
                      <Col sm={8}>{selectedCompany.legal_name}</Col>
                    </Row>
                    <Row className="mb-3">
                      <Col sm={4} className="fw-bold">CNPJ:</Col>
                      <Col sm={8}>{selectedCompany.legal_id}</Col>
                    </Row>
                    <Row className="mb-3">
                      <Col sm={4} className="fw-bold">Email:</Col>
                      <Col sm={8}>{selectedCompany.email}</Col>
                    </Row>
                    <Row className="mb-3">
                      <Col sm={4} className="fw-bold">Telefone:</Col>
                      <Col sm={8}>{selectedCompany.phone}</Col>
                    </Row>
                    <Row className="mb-3">
                      <Col sm={4} className="fw-bold">Status:</Col>
                      <Col sm={8}>
                        <Badge bg={selectedCompany.is_active ? 'success' : 'danger'}>
                          {selectedCompany.is_active ? 'Ativo' : 'Inativo'}
                        </Badge>
                      </Col>
                    </Row>
                    <Row className="mb-3">
                      <Col sm={4} className="fw-bold">Visível:</Col>
                      <Col sm={8}>
                        <Badge bg={selectedCompany.is_visible ? 'success' : 'warning'}>
                          {selectedCompany.is_visible ? 'Sim' : 'Não'}
                        </Badge>
                      </Col>
                    </Row>
                    <Row className="mb-3">
                      <Col sm={4} className="fw-bold">Público:</Col>
                      <Col sm={8}>
                        <Badge bg={selectedCompany.is_public ? 'success' : 'secondary'}>
                          {selectedCompany.is_public ? 'Sim' : 'Não'}
                        </Badge>
                      </Col>
                    </Row>
                    <Row className="mb-3">
                      <Col sm={4} className="fw-bold">Criado em:</Col>
                      <Col sm={8}>{new Date(selectedCompany.created_at).toLocaleDateString('pt-BR')}</Col>
                    </Row>
                    <Row className="mb-3">
                      <Col sm={4} className="fw-bold">Atualizado em:</Col>
                      <Col sm={8}>{new Date(selectedCompany.updated_at).toLocaleDateString('pt-BR')}</Col>
                    </Row>
                    {selectedCompany.address && (
                      <>
                        <hr />
                        <h6>Endereço</h6>
                        <pre className="mb-0" style={{ fontSize: '0.8rem' }}>
                          {JSON.stringify(selectedCompany.address, null, 2)}
                        </pre>
                      </>
                    )}
                  </>
                ) : companies && companies.length === 0 ? (
                  <Alert variant="info" className="mb-0">
                    Não há locais cadastrados
                  </Alert>
                ) : (
                  <Alert variant="info" className="mb-0">
                    Selecione um local para ver os detalhes
                  </Alert>
                )}
              </Card.Body>
            </Card>
          </Col>

          {/* Lista - 2/3 da tela */}
          <Col md={8}>
            <Card>
              <Card.Header className="d-flex justify-content-between align-items-center">
                <h5 className="mb-0">Lista de Locais</h5>
                <Button 
                  variant="primary" 
                  size="sm"
                  onClick={() => setShowAddModal(true)}
                >
                  <i className="bi bi-plus-circle me-1"></i>
                  Adicionar
                </Button>
              </Card.Header>
              <Card.Body>
                {companies && companies.length > 0 ? (
                  <>
                    <div className="table-responsive">
                      <table className="table table-hover">
                        <thead>
                          <tr>
                            <th>Nome</th>
                            <th>Razão Social</th>
                            <th>CNPJ</th>
                            <th>Status</th>
                            <th>Visível</th>
                            <th>Público</th>
                          </tr>
                        </thead>
                        <tbody>
                          {currentCompanies.map((company) => (
                            <tr 
                              key={company.id} 
                              className={selectedCompany?.id === company.id ? 'table-active' : ''}
                              style={{ cursor: 'pointer' }}
                              onClick={() => handleCompanySelect(company)}
                            >
                              <td>{company.name}</td>
                              <td>{company.legal_name}</td>
                              <td>{company.legal_id}</td>
                              <td>
                                <Badge bg={company.is_active ? 'success' : 'danger'}>
                                  {company.is_active ? 'Ativo' : 'Inativo'}
                                </Badge>
                              </td>
                              <td>
                                <Badge bg={company.is_visible ? 'success' : 'warning'}>
                                  {company.is_visible ? 'Sim' : 'Não'}
                                </Badge>
                              </td>
                              <td>
                                <Badge bg={company.is_public ? 'success' : 'secondary'}>
                                  {company.is_public ? 'Sim' : 'Não'}
                                </Badge>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>

                    {/* Paginação */}
                    {totalPages > 1 && (
                      <div className="d-flex justify-content-center mt-3">
                        <Pagination>
                          <Pagination.First 
                            onClick={() => handlePageChange(1)}
                            disabled={currentPage === 1}
                          />
                          <Pagination.Prev 
                            onClick={() => handlePageChange(currentPage - 1)}
                            disabled={currentPage === 1}
                          />
                          
                          {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                            <Pagination.Item
                              key={page}
                              active={page === currentPage}
                              onClick={() => handlePageChange(page)}
                            >
                              {page}
                            </Pagination.Item>
                          ))}
                          
                          <Pagination.Next 
                            onClick={() => handlePageChange(currentPage + 1)}
                            disabled={currentPage === totalPages}
                          />
                          <Pagination.Last 
                            onClick={() => handlePageChange(totalPages)}
                            disabled={currentPage === totalPages}
                          />
                        </Pagination>
                      </div>
                    )}

                    <div className="text-muted text-center mt-2">
                      Mostrando {startIndex + 1} a {Math.min(endIndex, companies.length)} de {companies.length} locais
                    </div>
                  </>
                ) : (
                  <Alert variant="info" className="mb-0">
                    Não há locais cadastrados
                  </Alert>
                )}
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
      <AppFooter />
      
      {/* Modal para adicionar nova empresa */}
      <AddCompanyModal 
        show={showAddModal}
        onHide={() => setShowAddModal(false)}
      />
    </>
  );
};

export default PlacesPage; 
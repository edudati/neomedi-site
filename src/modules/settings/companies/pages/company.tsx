import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { AppHeader } from '@/modules/shared/components/headers';
import { AppFooter } from '@/modules/shared/components/footers';
import { companyService } from '../services/company.service';
import { Card, Container, Row, Col, Alert, Button, Form } from 'react-bootstrap';
import { toast } from 'react-toastify';
import { useAuthContext } from '@/modules/auth/context/AuthContext';

export const CompanyPage: React.FC = () => {
  const { user } = useAuthContext();
  const [isEditingCompany, setIsEditingCompany] = useState(false);
  const [isEditingAddress, setIsEditingAddress] = useState(false);
  const [companyForm, setCompanyForm] = useState({
    name: '',
    legal_name: '',
    legal_id: '',
    email: '',
    phone: '',
    is_active: true,
    is_visible: true,
    is_public: false
  });
  const [addressForm, setAddressForm] = useState({
    street: '',
    number: '',
    complement: '',
    neighbourhood: '',
    city: '',
    state: '',
    zip_code: '',
    country: 'Brasil'
  });

  const queryClient = useQueryClient();

  const { data: company, isLoading, error } = useQuery({
    queryKey: ['company-profile', user?.user_uid],
    queryFn: () => {
      console.log('🔍 Buscando empresa para user_id:', user?.user_uid);
      return companyService.getCompanyByUserId(user?.user_uid || '');
    },
    enabled: !!user?.user_uid
  });

  console.log('👤 User:', user);
  console.log('🏢 Company data:', company);
  console.log('⏳ Loading:', isLoading);
  console.log('❌ Error:', error);

  const updateCompanyMutation = useMutation({
    mutationFn: ({ companyId, data }: { companyId: string; data: any }) =>
      companyService.updateCompany(companyId, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['company-profile'] });
      setIsEditingCompany(false);
      toast.success('Empresa atualizada com sucesso!');
    },
    onError: () => {
      toast.error('Erro ao atualizar empresa. Tente novamente.');
    }
  });

  const updateAddressMutation = useMutation({
    mutationFn: ({ companyId, data }: { companyId: string; data: any }) =>
      companyService.updateAddress(companyId, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['company-profile'] });
      setIsEditingAddress(false);
      toast.success('Endereço atualizado com sucesso!');
    },
    onError: () => {
      toast.error('Erro ao atualizar endereço. Tente novamente.');
    }
  });

  // Funções para manipular formulários
  const handleEditCompany = () => {
    if (company) {
      setCompanyForm({
        name: company.name,
        legal_name: company.legal_name,
        legal_id: company.legal_id,
        email: company.email,
        phone: company.phone,
        is_active: company.is_active,
        is_visible: company.is_visible,
        is_public: company.is_public
      });
      setIsEditingCompany(true);
    }
  };

  const handleCancelCompany = () => {
    setIsEditingCompany(false);
    setCompanyForm({
      name: '',
      legal_name: '',
      legal_id: '',
      email: '',
      phone: '',
      is_active: true,
      is_visible: true,
      is_public: false
    });
  };

  const handleSaveCompany = () => {
    if (company) {
      updateCompanyMutation.mutate({ companyId: company.id, data: companyForm });
    }
  };

  const handleEditAddress = () => {
    if (company?.address) {
      setAddressForm({
        street: company.address.street,
        number: company.address.number,
        complement: company.address.complement || '',
        neighbourhood: company.address.neighbourhood,
        city: company.address.city,
        state: company.address.state,
        zip_code: company.address.zip_code,
        country: company.address.country
      });
    }
    setIsEditingAddress(true);
  };

  const handleCancelAddress = () => {
    setIsEditingAddress(false);
    setAddressForm({
      street: '',
      number: '',
      complement: '',
      neighbourhood: '',
      city: '',
      state: '',
      zip_code: '',
      country: 'Brasil'
    });
  };

  const handleSaveAddress = () => {
    if (company) {
      updateAddressMutation.mutate({ companyId: company.id, data: addressForm });
    }
  };

  if (isLoading) {
    return (
      <>
        <AppHeader />
        <Container className="py-4">
          <div className="text-center">
            <div className="spinner-border" role="status">
              <span className="visually-hidden">Loading...</span>
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
            <Alert.Heading>Erro ao carregar dados da empresa</Alert.Heading>
            <p>Não foi possível carregar as informações da empresa. Tente novamente.</p>
          </Alert>
        </Container>
        <AppFooter />
      </>
    );
  }

  if (!company) {
    return (
      <>
        <AppHeader />
        <Container className="py-4">
          <Alert variant="info">
            <Alert.Heading>Nenhuma empresa encontrada</Alert.Heading>
            <p>Você não possui uma empresa associada à sua conta.</p>
          </Alert>
        </Container>
        <AppFooter />
      </>
    );
  }

  return (
    <>
      <AppHeader />
      <Container className="py-4">
        <Row>
          <Col>
            <h1 className="mb-4">
              <i className="bi bi-building me-2"></i>
              Minha Empresa
            </h1>
          </Col>
        </Row>

        <Row>
          {/* Informações da Empresa */}
          <Col lg={6} className="mb-4">
            <Card>
              <Card.Header className="d-flex justify-content-between align-items-center">
                <h5 className="mb-0">
                  <i className="bi bi-building me-2"></i>
                  Informações da Empresa
                </h5>
                {!isEditingCompany && (
                  <Button variant="outline-primary" size="sm" onClick={handleEditCompany}>
                    <i className="bi bi-pencil me-1"></i>
                    Editar
                  </Button>
                )}
              </Card.Header>
              <Card.Body>
                {isEditingCompany ? (
                  <Form>
                    <Row>
                      <Col md={6}>
                        <Form.Group className="mb-3">
                          <Form.Label>Nome Fantasia</Form.Label>
                          <Form.Control
                            type="text"
                            value={companyForm.name}
                            onChange={(e) => setCompanyForm({ ...companyForm, name: e.target.value })}
                          />
                        </Form.Group>
                      </Col>
                      <Col md={6}>
                        <Form.Group className="mb-3">
                          <Form.Label>Razão Social</Form.Label>
                          <Form.Control
                            type="text"
                            value={companyForm.legal_name}
                            onChange={(e) => setCompanyForm({ ...companyForm, legal_name: e.target.value })}
                          />
                        </Form.Group>
                      </Col>
                    </Row>
                    <Row>
                      <Col md={6}>
                        <Form.Group className="mb-3">
                          <Form.Label>CNPJ</Form.Label>
                          <Form.Control
                            type="text"
                            value={companyForm.legal_id}
                            onChange={(e) => setCompanyForm({ ...companyForm, legal_id: e.target.value })}
                            placeholder="00.000.000/0000-00"
                          />
                        </Form.Group>
                      </Col>
                      <Col md={6}>
                        <Form.Group className="mb-3">
                          <Form.Label>Email</Form.Label>
                          <Form.Control
                            type="email"
                            value={companyForm.email}
                            onChange={(e) => setCompanyForm({ ...companyForm, email: e.target.value })}
                          />
                        </Form.Group>
                      </Col>
                    </Row>
                    <Row>
                      <Col md={6}>
                        <Form.Group className="mb-3">
                          <Form.Label>Telefone</Form.Label>
                          <Form.Control
                            type="text"
                            value={companyForm.phone}
                            onChange={(e) => setCompanyForm({ ...companyForm, phone: e.target.value })}
                            placeholder="(11) 99999-9999"
                          />
                        </Form.Group>
                      </Col>
                      <Col md={6}>
                        <Form.Group className="mb-3">
                          <Form.Label>Status</Form.Label>
                          <div>
                            <Form.Check
                              inline
                              type="checkbox"
                              label="Ativa"
                              checked={companyForm.is_active}
                              onChange={(e) => setCompanyForm({ ...companyForm, is_active: e.target.checked })}
                            />
                            <Form.Check
                              inline
                              type="checkbox"
                              label="Visível"
                              checked={companyForm.is_visible}
                              onChange={(e) => setCompanyForm({ ...companyForm, is_visible: e.target.checked })}
                            />
                            <Form.Check
                              inline
                              type="checkbox"
                              label="Pública"
                              checked={companyForm.is_public}
                              onChange={(e) => setCompanyForm({ ...companyForm, is_public: e.target.checked })}
                            />
                          </div>
                        </Form.Group>
                      </Col>
                    </Row>
                    <div className="d-flex gap-2">
                      <Button variant="success" onClick={handleSaveCompany} disabled={updateCompanyMutation.isPending}>
                        {updateCompanyMutation.isPending ? (
                          <>
                            <span className="spinner-border spinner-border-sm me-2" />
                            Salvando...
                          </>
                        ) : (
                          <>
                            <i className="bi bi-check me-1"></i>
                            Salvar
                          </>
                        )}
                      </Button>
                      <Button variant="secondary" onClick={handleCancelCompany}>
                        Cancelar
                      </Button>
                    </div>
                  </Form>
                ) : (
                  <div>
                    <Row>
                      <Col md={6}>
                        <p><strong>Nome Fantasia:</strong> {company.name}</p>
                        <p><strong>Razão Social:</strong> {company.legal_name}</p>
                        <p><strong>CNPJ:</strong> {company.legal_id}</p>
                      </Col>
                      <Col md={6}>
                        <p><strong>Email:</strong> {company.email}</p>
                        <p><strong>Telefone:</strong> {company.phone}</p>
                        <p><strong>Status:</strong> 
                          <span className={`badge ms-2 ${company.is_active ? 'bg-success' : 'bg-danger'}`}>
                            {company.is_active ? 'Ativa' : 'Inativa'}
                          </span>
                        </p>
                      </Col>
                    </Row>
                  </div>
                )}
              </Card.Body>
            </Card>
          </Col>

          {/* Endereço da Empresa */}
          <Col lg={6} className="mb-4">
            <Card>
              <Card.Header className="d-flex justify-content-between align-items-center">
                <h5 className="mb-0">
                  <i className="bi bi-geo-alt me-2"></i>
                  Endereço
                </h5>
                {!isEditingAddress && (
                  <Button variant="outline-primary" size="sm" onClick={handleEditAddress}>
                    <i className="bi bi-pencil me-1"></i>
                    Editar
                  </Button>
                )}
              </Card.Header>
              <Card.Body>
                {isEditingAddress ? (
                  <Form>
                    <Row>
                      <Col md={8}>
                        <Form.Group className="mb-3">
                          <Form.Label>Rua</Form.Label>
                          <Form.Control
                            type="text"
                            value={addressForm.street}
                            onChange={(e) => setAddressForm({ ...addressForm, street: e.target.value })}
                          />
                        </Form.Group>
                      </Col>
                      <Col md={4}>
                        <Form.Group className="mb-3">
                          <Form.Label>Número</Form.Label>
                          <Form.Control
                            type="text"
                            value={addressForm.number}
                            onChange={(e) => setAddressForm({ ...addressForm, number: e.target.value })}
                          />
                        </Form.Group>
                      </Col>
                    </Row>
                    <Form.Group className="mb-3">
                      <Form.Label>Complemento</Form.Label>
                      <Form.Control
                        type="text"
                        value={addressForm.complement}
                        onChange={(e) => setAddressForm({ ...addressForm, complement: e.target.value })}
                        placeholder="Apartamento, andar, etc."
                      />
                    </Form.Group>
                    <Row>
                      <Col md={6}>
                        <Form.Group className="mb-3">
                          <Form.Label>Bairro</Form.Label>
                          <Form.Control
                            type="text"
                            value={addressForm.neighbourhood}
                            onChange={(e) => setAddressForm({ ...addressForm, neighbourhood: e.target.value })}
                          />
                        </Form.Group>
                      </Col>
                      <Col md={6}>
                        <Form.Group className="mb-3">
                          <Form.Label>Cidade</Form.Label>
                          <Form.Control
                            type="text"
                            value={addressForm.city}
                            onChange={(e) => setAddressForm({ ...addressForm, city: e.target.value })}
                          />
                        </Form.Group>
                      </Col>
                    </Row>
                    <Row>
                      <Col md={4}>
                        <Form.Group className="mb-3">
                          <Form.Label>Estado</Form.Label>
                          <Form.Control
                            type="text"
                            value={addressForm.state}
                            onChange={(e) => setAddressForm({ ...addressForm, state: e.target.value })}
                            placeholder="SP"
                          />
                        </Form.Group>
                      </Col>
                      <Col md={4}>
                        <Form.Group className="mb-3">
                          <Form.Label>CEP</Form.Label>
                          <Form.Control
                            type="text"
                            value={addressForm.zip_code}
                            onChange={(e) => setAddressForm({ ...addressForm, zip_code: e.target.value })}
                            placeholder="00000-000"
                          />
                        </Form.Group>
                      </Col>
                      <Col md={4}>
                        <Form.Group className="mb-3">
                          <Form.Label>País</Form.Label>
                          <Form.Control
                            type="text"
                            value={addressForm.country}
                            onChange={(e) => setAddressForm({ ...addressForm, country: e.target.value })}
                          />
                        </Form.Group>
                      </Col>
                    </Row>
                    <div className="d-flex gap-2">
                      <Button variant="success" onClick={handleSaveAddress} disabled={updateAddressMutation.isPending}>
                        {updateAddressMutation.isPending ? (
                          <>
                            <span className="spinner-border spinner-border-sm me-2" />
                            Salvando...
                          </>
                        ) : (
                          <>
                            <i className="bi bi-check me-1"></i>
                            Salvar
                          </>
                        )}
                      </Button>
                      <Button variant="secondary" onClick={handleCancelAddress}>
                        Cancelar
                      </Button>
                    </div>
                  </Form>
                ) : (
                  <div>
                    {company.address ? (
                      <div>
                        <p><strong>Endereço:</strong> {company.address.street}, {company.address.number}</p>
                        {company.address.complement && (
                          <p><strong>Complemento:</strong> {company.address.complement}</p>
                        )}
                        <p><strong>Bairro:</strong> {company.address.neighbourhood}</p>
                        <p><strong>Cidade:</strong> {company.address.city} - {company.address.state}</p>
                        <p><strong>CEP:</strong> {company.address.zip_code}</p>
                        <p><strong>País:</strong> {company.address.country}</p>
                      </div>
                    ) : (
                      <Alert variant="info">
                        <i className="bi bi-info-circle me-2"></i>
                        Nenhum endereço cadastrado para esta empresa.
                      </Alert>
                    )}
                  </div>
                )}
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
      <AppFooter />
    </>
  );
}; 
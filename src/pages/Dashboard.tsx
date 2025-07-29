import React from 'react';
import { Container, Row, Col, Card, Button, Spinner } from 'react-bootstrap';
import { useAuthContext } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';

const Dashboard: React.FC = () => {
  const { authUser, loading, signOut } = useAuthContext();
  const navigate = useNavigate();

  const handleSignOut = async () => {
    const result = await signOut();
    if (result.success) {
      navigate('/login');
    }
  };

  // Debug logs
  console.log('Dashboard - loading:', loading);
  console.log('Dashboard - authUser:', authUser);

  if (loading) {
    return (
      <div className="min-vh-100 d-flex align-items-center justify-content-center bg-light">
        <div className="text-center">
          <Spinner animation="border" role="status" className="mb-3">
            <span className="visually-hidden">Carregando...</span>
          </Spinner>
          <p>Carregando dashboard...</p>
        </div>
      </div>
    );
  }

  if (!authUser) {
    return (
      <div className="min-vh-100 d-flex align-items-center justify-content-center bg-light">
        <div className="text-center">
          <p>Usuário não autenticado</p>
          <Button onClick={() => navigate('/login')}>Ir para Login</Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-vh-100 bg-light">
      <Container className="py-5">
        <Row className="justify-content-center">
          <Col md={8} lg={6}>
            <Card className="shadow">
              <Card.Header className="bg-primary text-white">
                <h4 className="mb-0">Dashboard</h4>
              </Card.Header>
              <Card.Body>
                <div className="text-center mb-4">
                  <h5>Bem-vindo, {authUser.name}!</h5>
                  <p className="text-muted">
                    Você está logado como: <strong>{authUser.email}</strong>
                  </p>
                </div>

                <div className="mb-4">
                  <h6>Informações do usuário:</h6>
                  <ul className="list-unstyled">
                    <li><strong>Nome:</strong> {authUser.name}</li>
                    <li><strong>Email:</strong> {authUser.email}</li>
                    <li><strong>User UID:</strong> {authUser.user_uid}</li>
                    <li><strong>Função:</strong> {authUser.role}</li>
                    <li><strong>Email verificado:</strong> {authUser.email_verified ? 'Sim' : 'Não'}</li>
                    <li><strong>Ativo:</strong> {authUser.is_active ? 'Sim' : 'Não'}</li>
                    <li><strong>Criado em:</strong> {new Date(authUser.created_at).toLocaleDateString('pt-BR')}</li>
                  </ul>
                </div>

                <div className="d-grid">
                  <Button 
                    variant="outline-danger" 
                    onClick={handleSignOut}
                    size="lg"
                  >
                    Sair
                  </Button>
                </div>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Dashboard; 
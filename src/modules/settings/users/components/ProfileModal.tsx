import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Modal, Card, Container, Row, Col, Alert, Button, Form } from 'react-bootstrap';
import { toast } from 'react-toastify';
import { authToken } from '@/modules/shared/services/authToken';
import { userService } from '../services/user.service';
import type { Gender } from '../types/user.types';

interface ProfileModalProps {
  show: boolean;
  onHide: () => void;
}

export const ProfileModal: React.FC<ProfileModalProps> = ({ show, onHide }) => {
  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const [isEditingAddress, setIsEditingAddress] = useState(false);
  const [profileForm, setProfileForm] = useState({ 
    name: '', 
    phone: '', 
    birth_date: '', 
    gender: '' as Gender 
  });
  const [addressForm, setAddressForm] = useState({
    street: '', 
    number: '', 
    complement: '', 
    neighbourhood: '', 
    city: '', 
    state: '', 
    zip_code: '',
    country: 'Brasil',
    latitude: 0,
    longitude: 0
  });

  const queryClient = useQueryClient();

  const { data: user, isLoading, error } = useQuery({
    queryKey: ['user-profile'],
    queryFn: userService.getMyProfile
  });

  // Obter dados do JWT para visualização
  const jwtPayload = authToken.getPayload();

  // Opções de gênero em português
  const genderOptions = [
    { value: 'male', label: 'Masculino' },
    { value: 'female', label: 'Feminino' },
    { value: 'other', label: 'Outro' },
    { value: 'undisclosed', label: 'Não informado' }
  ];

  const updateProfileMutation = useMutation({
    mutationFn: userService.updateProfile,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['user-profile'] });
      setIsEditingProfile(false);
      toast.success('Perfil atualizado com sucesso!');
    },
    onError: () => {
      toast.error('Erro ao atualizar perfil. Tente novamente.');
    }
  });

  const updateAddressMutation = useMutation({
    mutationFn: userService.updateAddress,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['user-profile'] });
      setIsEditingAddress(false);
      toast.success('Endereço atualizado com sucesso!');
    },
    onError: () => {
      toast.error('Erro ao atualizar endereço. Tente novamente.');
    }
  });

  // Funções para manipular formulários
  const handleEditProfile = () => {
    if (user) {
      setProfileForm({ 
        name: user.name, 
        phone: user.phone, 
        birth_date: user.birth_date ? user.birth_date.split('T')[0] : '', // Formato YYYY-MM-DD para input date
        gender: user.gender 
      });
      setIsEditingProfile(true);
    }
  };

  const handleCancelProfile = () => {
    setIsEditingProfile(false);
    setProfileForm({ name: '', phone: '', birth_date: '', gender: '' as Gender });
  };

  const handleSaveProfile = () => {
    // Converter data para formato ISO se fornecida
    const updateData = {
      ...profileForm,
      birth_date: profileForm.birth_date ? new Date(profileForm.birth_date).toISOString() : undefined
    };
    updateProfileMutation.mutate(updateData);
  };

  const handleEditAddress = () => {
    if (user?.address) {
      setAddressForm({
        street: user.address.street,
        number: user.address.number,
        complement: user.address.complement || '',
        neighbourhood: user.address.neighbourhood,
        city: user.address.city,
        state: user.address.state,
        zip_code: user.address.zip_code,
        country: user.address.country || 'Brasil',
        latitude: user.address.latitude || 0,
        longitude: user.address.longitude || 0
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
      country: 'Brasil',
      latitude: 0,
      longitude: 0
    });
  };

  const handleSaveAddress = () => {
    // Adicionar user_id e company_id baseado no contexto
    const addressData = {
      ...addressForm,
      user_id: user?.id, // ID do usuário atual
      company_id: '' // Endereço do usuário, não da empresa
    };
    updateAddressMutation.mutate(addressData);
  };

  // Função para obter label do gênero
  const getGenderLabel = (gender: Gender) => {
    const option = genderOptions.find(opt => opt.value === gender);
    return option ? option.label : gender;
  };

  if (isLoading) {
    return (
      <Modal show={show} onHide={onHide} size="xl">
        <Modal.Header closeButton>
          <Modal.Title>Meu Perfil</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="text-center">
            <div className="spinner-border" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    );
  }

  if (error) {
    return (
      <Modal show={show} onHide={onHide} size="xl">
        <Modal.Header closeButton>
          <Modal.Title>Meu Perfil</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Alert variant="danger">
            Error loading profile data. Please try again later.
          </Alert>
        </Modal.Body>
      </Modal>
    );
  }

  if (!user) return null;

  return (
    <Modal show={show} onHide={onHide} size="xl">
      <Modal.Header closeButton>
        <Modal.Title>Meu Perfil</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Container fluid>
          <Row className="g-4">
            <Col md={6}>
              <Card>
                <Card.Header className="d-flex justify-content-between align-items-center">
                  <h5 className="mb-0">Informações Pessoais</h5>
                  {!isEditingProfile && (
                    <Button variant="outline-primary" size="sm" onClick={handleEditProfile}>
                      <i className="bi bi-pencil me-1"></i>
                      Editar
                    </Button>
                  )}
                </Card.Header>
                <Card.Body>
                  {isEditingProfile ? (
                    <Form>
                      <Row className="mb-3">
                        <Col sm={4} className="fw-bold">Nome:</Col>
                        <Col sm={8}>
                          <Form.Control
                            type="text"
                            value={profileForm.name}
                            onChange={(e) => setProfileForm({ ...profileForm, name: e.target.value })}
                          />
                        </Col>
                      </Row>
                      <Row className="mb-3">
                        <Col sm={4} className="fw-bold">Email:</Col>
                        <Col sm={8}>
                          <Form.Control type="email" value={user.email} disabled />
                        </Col>
                      </Row>
                      <Row className="mb-3">
                        <Col sm={4} className="fw-bold">Telefone:</Col>
                        <Col sm={8}>
                          <Form.Control
                            type="text"
                            value={profileForm.phone}
                            onChange={(e) => setProfileForm({ ...profileForm, phone: e.target.value })}
                          />
                        </Col>
                      </Row>
                      <Row className="mb-3">
                        <Col sm={4} className="fw-bold">Data de Nascimento:</Col>
                        <Col sm={8}>
                          <Form.Control
                            type="date"
                            value={profileForm.birth_date}
                            onChange={(e) => setProfileForm({ ...profileForm, birth_date: e.target.value })}
                          />
                        </Col>
                      </Row>
                      <Row className="mb-3">
                        <Col sm={4} className="fw-bold">Gênero:</Col>
                        <Col sm={8}>
                          <Form.Select
                            value={profileForm.gender}
                            onChange={(e) => setProfileForm({ ...profileForm, gender: e.target.value as Gender })}
                          >
                            <option value="">Selecione...</option>
                            {genderOptions.map(option => (
                              <option key={option.value} value={option.value}>
                                {option.label}
                              </option>
                            ))}
                          </Form.Select>
                        </Col>
                      </Row>
                      <Row className="mb-3">
                        <Col sm={4} className="fw-bold">Função:</Col>
                        <Col sm={8}>
                          <Form.Control type="text" value={user.role} disabled />
                        </Col>
                      </Row>
                      <Row className="mb-3">
                        <Col sm={4} className="fw-bold">Status:</Col>
                        <Col sm={8}>
                          <span className={`badge bg-${user.is_active ? 'success' : 'danger'}`}>
                            {user.is_active ? 'Ativo' : 'Inativo'}
                          </span>
                        </Col>
                      </Row>
                      <Row className="mb-3">
                        <Col sm={4} className="fw-bold">Verificado:</Col>
                        <Col sm={8}>
                          <span className={`badge bg-${user.is_verified ? 'success' : 'warning'}`}>
                            {user.is_verified ? 'Verificado' : 'Não Verificado'}
                          </span>
                        </Col>
                      </Row>
                      <Row className="mb-3">
                        <Col sm={4} className="fw-bold">Acesso:</Col>
                        <Col sm={8}>
                          <span className={`badge bg-${user.has_access ? 'success' : 'warning'}`}>
                            {user.has_access ? 'Com Acesso' : 'Sem Acesso'}
                          </span>
                        </Col>
                      </Row>
                      <Row className="mt-3">
                        <Col sm={12} className="d-flex gap-2 justify-content-end">
                          <Button variant="secondary" size="sm" onClick={handleCancelProfile}>
                            Cancelar
                          </Button>
                          <Button 
                            variant="primary" 
                            size="sm" 
                            onClick={handleSaveProfile}
                            disabled={updateProfileMutation.isPending}
                          >
                            {updateProfileMutation.isPending ? 'Salvando...' : 'Salvar'}
                          </Button>
                        </Col>
                      </Row>
                    </Form>
                  ) : (
                    <>
                      <Row className="mb-3">
                        <Col sm={4} className="fw-bold">Nome:</Col>
                        <Col sm={8}>{user.name}</Col>
                      </Row>
                      <Row className="mb-3">
                        <Col sm={4} className="fw-bold">Email:</Col>
                        <Col sm={8}>{user.email}</Col>
                      </Row>
                      <Row className="mb-3">
                        <Col sm={4} className="fw-bold">Telefone:</Col>
                        <Col sm={8}>{user.phone}</Col>
                      </Row>
                      <Row className="mb-3">
                        <Col sm={4} className="fw-bold">Data de Nascimento:</Col>
                        <Col sm={8}>
                          {user.birth_date ? new Date(user.birth_date).toLocaleDateString('pt-BR') : 'Não informado'}
                        </Col>
                      </Row>
                      <Row className="mb-3">
                        <Col sm={4} className="fw-bold">Gênero:</Col>
                        <Col sm={8}>{getGenderLabel(user.gender)}</Col>
                      </Row>
                      <Row className="mb-3">
                        <Col sm={4} className="fw-bold">Função:</Col>
                        <Col sm={8}>{user.role}</Col>
                      </Row>
                      <Row className="mb-3">
                        <Col sm={4} className="fw-bold">Status:</Col>
                        <Col sm={8}>
                          <span className={`badge bg-${user.is_active ? 'success' : 'danger'}`}>
                            {user.is_active ? 'Ativo' : 'Inativo'}
                          </span>
                        </Col>
                      </Row>
                      <Row className="mb-3">
                        <Col sm={4} className="fw-bold">Verificado:</Col>
                        <Col sm={8}>
                          <span className={`badge bg-${user.is_verified ? 'success' : 'warning'}`}>
                            {user.is_verified ? 'Verificado' : 'Não Verificado'}
                          </span>
                        </Col>
                      </Row>
                      <Row className="mb-3">
                        <Col sm={4} className="fw-bold">Acesso:</Col>
                        <Col sm={8}>
                          <span className={`badge bg-${user.has_access ? 'success' : 'warning'}`}>
                            {user.has_access ? 'Com Acesso' : 'Sem Acesso'}
                          </span>
                        </Col>
                      </Row>
                    </>
                  )}
                </Card.Body>
              </Card>
            </Col>

            <Col md={6}>
              <Card>
                <Card.Header className="d-flex justify-content-between align-items-center">
                  <h5 className="mb-0">Informações de Endereço</h5>
                  {!isEditingAddress && (
                    <Button variant="outline-primary" size="sm" onClick={handleEditAddress}>
                      <i className="bi bi-pencil me-1"></i>
                      {user.address ? 'Editar' : 'Adicionar'}
                    </Button>
                  )}
                </Card.Header>
                <Card.Body>
                  {isEditingAddress ? (
                    <Form>
                      <Row className="mb-3">
                        <Col sm={4} className="fw-bold">Rua:</Col>
                        <Col sm={8}>
                          <Form.Control
                            type="text"
                            value={addressForm.street}
                            onChange={(e) => setAddressForm({ ...addressForm, street: e.target.value })}
                          />
                        </Col>
                      </Row>
                      <Row className="mb-3">
                        <Col sm={4} className="fw-bold">Número:</Col>
                        <Col sm={8}>
                          <Form.Control
                            type="text"
                            value={addressForm.number}
                            onChange={(e) => setAddressForm({ ...addressForm, number: e.target.value })}
                          />
                        </Col>
                      </Row>
                      <Row className="mb-3">
                        <Col sm={4} className="fw-bold">Complemento:</Col>
                        <Col sm={8}>
                          <Form.Control
                            type="text"
                            value={addressForm.complement}
                            onChange={(e) => setAddressForm({ ...addressForm, complement: e.target.value })}
                          />
                        </Col>
                      </Row>
                      <Row className="mb-3">
                        <Col sm={4} className="fw-bold">Bairro:</Col>
                        <Col sm={8}>
                          <Form.Control
                            type="text"
                            value={addressForm.neighbourhood}
                            onChange={(e) => setAddressForm({ ...addressForm, neighbourhood: e.target.value })}
                          />
                        </Col>
                      </Row>
                      <Row className="mb-3">
                        <Col sm={4} className="fw-bold">Cidade:</Col>
                        <Col sm={8}>
                          <Form.Control
                            type="text"
                            value={addressForm.city}
                            onChange={(e) => setAddressForm({ ...addressForm, city: e.target.value })}
                          />
                        </Col>
                      </Row>
                      <Row className="mb-3">
                        <Col sm={4} className="fw-bold">Estado:</Col>
                        <Col sm={8}>
                          <Form.Control
                            type="text"
                            value={addressForm.state}
                            onChange={(e) => setAddressForm({ ...addressForm, state: e.target.value })}
                          />
                        </Col>
                      </Row>
                      <Row className="mb-3">
                        <Col sm={4} className="fw-bold">CEP:</Col>
                        <Col sm={8}>
                          <Form.Control
                            type="text"
                            value={addressForm.zip_code}
                            onChange={(e) => setAddressForm({ ...addressForm, zip_code: e.target.value })}
                          />
                        </Col>
                      </Row>
                      <Row className="mb-3">
                        <Col sm={4} className="fw-bold">País:</Col>
                        <Col sm={8}>
                          <Form.Control type="text" value="Brasil" disabled />
                        </Col>
                      </Row>
                      <Row className="mt-3">
                        <Col sm={12} className="d-flex gap-2 justify-content-end">
                          <Button variant="secondary" size="sm" onClick={handleCancelAddress}>
                            Cancelar
                          </Button>
                          <Button 
                            variant="primary" 
                            size="sm" 
                            onClick={handleSaveAddress}
                            disabled={updateAddressMutation.isPending}
                          >
                            {updateAddressMutation.isPending ? 'Salvando...' : 'Salvar'}
                          </Button>
                        </Col>
                      </Row>
                    </Form>
                  ) : (
                    <>
                      {user.address ? (
                        <>
                          <Row className="mb-3">
                            <Col sm={4} className="fw-bold">Rua:</Col>
                            <Col sm={8}>{user.address.street}, {user.address.number}</Col>
                          </Row>
                          {user.address.complement && (
                            <Row className="mb-3">
                              <Col sm={4} className="fw-bold">Complemento:</Col>
                              <Col sm={8}>{user.address.complement}</Col>
                            </Row>
                          )}
                          <Row className="mb-3">
                            <Col sm={4} className="fw-bold">Bairro:</Col>
                            <Col sm={8}>{user.address.neighbourhood}</Col>
                          </Row>
                          <Row className="mb-3">
                            <Col sm={4} className="fw-bold">Cidade:</Col>
                            <Col sm={8}>{user.address.city}</Col>
                          </Row>
                          <Row className="mb-3">
                            <Col sm={4} className="fw-bold">Estado:</Col>
                            <Col sm={8}>{user.address.state}</Col>
                          </Row>
                          <Row className="mb-3">
                            <Col sm={4} className="fw-bold">CEP:</Col>
                            <Col sm={8}>{user.address.zip_code}</Col>
                          </Row>
                          <Row className="mb-3">
                            <Col sm={4} className="fw-bold">País:</Col>
                            <Col sm={8}>{user.address.country}</Col>
                          </Row>
                        </>
                      ) : (
                        <Alert variant="info" className="mb-0">
                          Nenhuma informação de endereço disponível
                        </Alert>
                      )}
                    </>
                  )}
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>
      </Modal.Body>
    </Modal>
  );
};

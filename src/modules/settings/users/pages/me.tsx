import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { AppHeader } from '@/modules/shared/components/headers';
import { AppFooter } from '@/modules/shared/components/footers';
import { userService } from '../services/user.service';
import { Card, Container, Row, Col, Alert, Button, Form } from 'react-bootstrap';
import { toast } from 'react-toastify';

export const MyProfilePage: React.FC = () => {
  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const [isEditingAddress, setIsEditingAddress] = useState(false);
  const [profileForm, setProfileForm] = useState({ name: '', phone: '' });
  const [addressForm, setAddressForm] = useState({
    street: '', number: '', complement: '', neighbourhood: '', city: '', state: '', zip_code: ''
  });

  const queryClient = useQueryClient();

  const { data: user, isLoading, error } = useQuery({
    queryKey: ['user-profile'],
    queryFn: userService.getMyProfile
  });

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
      setProfileForm({ name: user.name, phone: user.phone });
      setIsEditingProfile(true);
    }
  };

  const handleCancelProfile = () => {
    setIsEditingProfile(false);
    setProfileForm({ name: '', phone: '' });
  };

  const handleSaveProfile = () => {
    updateProfileMutation.mutate(profileForm);
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
        zip_code: user.address.zip_code
      });
    }
    setIsEditingAddress(true);
  };

  const handleCancelAddress = () => {
    setIsEditingAddress(false);
    setAddressForm({
      street: '', number: '', complement: '', neighbourhood: '', city: '', state: '', zip_code: ''
    });
  };

  const handleSaveAddress = () => {
    updateAddressMutation.mutate(addressForm);
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
            Error loading profile data. Please try again later.
          </Alert>
        </Container>
        <AppFooter />
      </>
    );
  }

  if (!user) return null;

  return (
    <>
      <AppHeader />
      <Container className="py-4">
      <h1 className="mb-4">My Profile</h1>
      
      <Row className="g-4">
        <Col md={6}>
          <Card>
            <Card.Header className="d-flex justify-content-between align-items-center">
              <h5 className="mb-0">Personal Information</h5>
              {!isEditingProfile && (
                <Button variant="outline-primary" size="sm" onClick={handleEditProfile}>
                  <i className="bi bi-pencil me-1"></i>
                  Edit
                </Button>
              )}
            </Card.Header>
            <Card.Body>
              {isEditingProfile ? (
                <Form>
                  <Row className="mb-3">
                    <Col sm={4} className="fw-bold">Name:</Col>
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
                      <Form.Control type="email" value={user.auth_user.email} disabled />
                    </Col>
                  </Row>
                  <Row className="mb-3">
                    <Col sm={4} className="fw-bold">Phone:</Col>
                    <Col sm={8}>
                      <Form.Control
                        type="text"
                        value={profileForm.phone}
                        onChange={(e) => setProfileForm({ ...profileForm, phone: e.target.value })}
                      />
                    </Col>
                  </Row>
                  <Row className="mb-3">
                    <Col sm={4} className="fw-bold">Role:</Col>
                    <Col sm={8}>
                      <Form.Control type="text" value={user.role} disabled />
                    </Col>
                  </Row>
                  <Row className="mb-3">
                    <Col sm={4} className="fw-bold">Status:</Col>
                    <Col sm={8}>
                      <span className={`badge bg-${user.is_active ? 'success' : 'danger'}`}>
                        {user.is_active ? 'Active' : 'Inactive'}
                      </span>
                    </Col>
                  </Row>
                  <Row className="mb-3">
                    <Col sm={4} className="fw-bold">Verified:</Col>
                    <Col sm={8}>
                      <span className={`badge bg-${user.is_verified ? 'success' : 'warning'}`}>
                        {user.is_verified ? 'Verified' : 'Not Verified'}
                      </span>
                    </Col>
                  </Row>
                  <Row className="mb-3">
                    <Col sm={4} className="fw-bold">Email Verified:</Col>
                    <Col sm={8}>
                      <span className={`badge bg-${user.auth_user.email_verified ? 'success' : 'warning'}`}>
                        {user.auth_user.email_verified ? 'Yes' : 'No'}
                      </span>
                    </Col>
                  </Row>
                  <Row className="mt-3">
                    <Col sm={12} className="d-flex gap-2 justify-content-end">
                      <Button variant="secondary" size="sm" onClick={handleCancelProfile}>
                        Cancel
                      </Button>
                      <Button 
                        variant="primary" 
                        size="sm" 
                        onClick={handleSaveProfile}
                        disabled={updateProfileMutation.isPending}
                      >
                        {updateProfileMutation.isPending ? 'Saving...' : 'Save'}
                      </Button>
                    </Col>
                  </Row>
                </Form>
              ) : (
                <>
                  <Row className="mb-3">
                    <Col sm={4} className="fw-bold">Name:</Col>
                    <Col sm={8}>{user.name}</Col>
                  </Row>
                  <Row className="mb-3">
                    <Col sm={4} className="fw-bold">Email:</Col>
                    <Col sm={8}>{user.auth_user.email}</Col>
                  </Row>
                  <Row className="mb-3">
                    <Col sm={4} className="fw-bold">Phone:</Col>
                    <Col sm={8}>{user.phone}</Col>
                  </Row>
                  <Row className="mb-3">
                    <Col sm={4} className="fw-bold">Role:</Col>
                    <Col sm={8}>{user.role}</Col>
                  </Row>
                  <Row className="mb-3">
                    <Col sm={4} className="fw-bold">Status:</Col>
                    <Col sm={8}>
                      <span className={`badge bg-${user.is_active ? 'success' : 'danger'}`}>
                        {user.is_active ? 'Active' : 'Inactive'}
                      </span>
                    </Col>
                  </Row>
                  <Row className="mb-3">
                    <Col sm={4} className="fw-bold">Verified:</Col>
                    <Col sm={8}>
                      <span className={`badge bg-${user.is_verified ? 'success' : 'warning'}`}>
                        {user.is_verified ? 'Verified' : 'Not Verified'}
                      </span>
                    </Col>
                  </Row>
                  <Row className="mb-3">
                    <Col sm={4} className="fw-bold">Email Verified:</Col>
                    <Col sm={8}>
                      <span className={`badge bg-${user.auth_user.email_verified ? 'success' : 'warning'}`}>
                        {user.auth_user.email_verified ? 'Yes' : 'No'}
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
              <h5 className="mb-0">Address Information</h5>
              {!isEditingAddress && (
                <Button variant="outline-primary" size="sm" onClick={handleEditAddress}>
                  <i className="bi bi-pencil me-1"></i>
                  {user.address ? 'Edit' : 'Add'}
                </Button>
              )}
            </Card.Header>
            <Card.Body>
              {isEditingAddress ? (
                <Form>
                  <Row className="mb-3">
                    <Col sm={4} className="fw-bold">Street:</Col>
                    <Col sm={8}>
                      <Form.Control
                        type="text"
                        value={addressForm.street}
                        onChange={(e) => setAddressForm({ ...addressForm, street: e.target.value })}
                      />
                    </Col>
                  </Row>
                  <Row className="mb-3">
                    <Col sm={4} className="fw-bold">Number:</Col>
                    <Col sm={8}>
                      <Form.Control
                        type="text"
                        value={addressForm.number}
                        onChange={(e) => setAddressForm({ ...addressForm, number: e.target.value })}
                      />
                    </Col>
                  </Row>
                  <Row className="mb-3">
                    <Col sm={4} className="fw-bold">Complement:</Col>
                    <Col sm={8}>
                      <Form.Control
                        type="text"
                        value={addressForm.complement}
                        onChange={(e) => setAddressForm({ ...addressForm, complement: e.target.value })}
                      />
                    </Col>
                  </Row>
                  <Row className="mb-3">
                    <Col sm={4} className="fw-bold">Neighborhood:</Col>
                    <Col sm={8}>
                      <Form.Control
                        type="text"
                        value={addressForm.neighbourhood}
                        onChange={(e) => setAddressForm({ ...addressForm, neighbourhood: e.target.value })}
                      />
                    </Col>
                  </Row>
                  <Row className="mb-3">
                    <Col sm={4} className="fw-bold">City:</Col>
                    <Col sm={8}>
                      <Form.Control
                        type="text"
                        value={addressForm.city}
                        onChange={(e) => setAddressForm({ ...addressForm, city: e.target.value })}
                      />
                    </Col>
                  </Row>
                  <Row className="mb-3">
                    <Col sm={4} className="fw-bold">State:</Col>
                    <Col sm={8}>
                      <Form.Control
                        type="text"
                        value={addressForm.state}
                        onChange={(e) => setAddressForm({ ...addressForm, state: e.target.value })}
                      />
                    </Col>
                  </Row>
                  <Row className="mb-3">
                    <Col sm={4} className="fw-bold">ZIP Code:</Col>
                    <Col sm={8}>
                      <Form.Control
                        type="text"
                        value={addressForm.zip_code}
                        onChange={(e) => setAddressForm({ ...addressForm, zip_code: e.target.value })}
                      />
                    </Col>
                  </Row>
                  <Row className="mb-3">
                    <Col sm={4} className="fw-bold">Country:</Col>
                    <Col sm={8}>
                      <Form.Control type="text" value="Brasil" disabled />
                    </Col>
                  </Row>
                  <Row className="mt-3">
                    <Col sm={12} className="d-flex gap-2 justify-content-end">
                      <Button variant="secondary" size="sm" onClick={handleCancelAddress}>
                        Cancel
                      </Button>
                      <Button 
                        variant="primary" 
                        size="sm" 
                        onClick={handleSaveAddress}
                        disabled={updateAddressMutation.isPending}
                      >
                        {updateAddressMutation.isPending ? 'Saving...' : 'Save'}
                      </Button>
                    </Col>
                  </Row>
                </Form>
              ) : (
                <>
                  {user.address ? (
                    <>
                      <Row className="mb-3">
                        <Col sm={4} className="fw-bold">Street:</Col>
                        <Col sm={8}>{user.address.street}, {user.address.number}</Col>
                      </Row>
                      {user.address.complement && (
                        <Row className="mb-3">
                          <Col sm={4} className="fw-bold">Complement:</Col>
                          <Col sm={8}>{user.address.complement}</Col>
                        </Row>
                      )}
                      <Row className="mb-3">
                        <Col sm={4} className="fw-bold">Neighborhood:</Col>
                        <Col sm={8}>{user.address.neighbourhood}</Col>
                      </Row>
                      <Row className="mb-3">
                        <Col sm={4} className="fw-bold">City:</Col>
                        <Col sm={8}>{user.address.city}</Col>
                      </Row>
                      <Row className="mb-3">
                        <Col sm={4} className="fw-bold">State:</Col>
                        <Col sm={8}>{user.address.state}</Col>
                      </Row>
                      <Row className="mb-3">
                        <Col sm={4} className="fw-bold">ZIP Code:</Col>
                        <Col sm={8}>{user.address.zip_code}</Col>
                      </Row>
                      <Row className="mb-3">
                        <Col sm={4} className="fw-bold">Country:</Col>
                        <Col sm={8}>{user.address.country}</Col>
                      </Row>
                    </>
                  ) : (
                    <Alert variant="info" className="mb-0">
                      No address information available
                    </Alert>
                  )}
                </>
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

export default MyProfilePage;
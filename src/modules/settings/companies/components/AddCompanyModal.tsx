import React, { useState } from 'react';
import { Modal, Form, Button, Row, Col, Alert } from 'react-bootstrap';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { companyService } from '../services/company.service';
import type { CreateCompanyRequest } from '../types/company.types';

interface AddCompanyModalProps {
  show: boolean;
  onHide: () => void;
}

export const AddCompanyModal: React.FC<AddCompanyModalProps> = ({ show, onHide }) => {
  const queryClient = useQueryClient();
  const [formData, setFormData] = useState<CreateCompanyRequest>({
    name: '',
    description: '',
    email: '',
    phone: '',
    social_media: {},
    is_virtual: false,
    is_active: true,
    address: {
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
    }
  });

  const createCompanyMutation = useMutation({
    mutationFn: companyService.createCompany,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['companies'] });
      onHide();
      resetForm();
    }
  });

  const resetForm = () => {
    setFormData({
      name: '',
      description: '',
      email: '',
      phone: '',
      social_media: {},
      is_virtual: false,
      is_active: true,
      address: {
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
      }
    });
  };

  const handleInputChange = (field: string, value: any) => {
    if (field.includes('.')) {
      const [parent, child] = field.split('.');
      setFormData(prev => {
        const parentObj = prev[parent as keyof CreateCompanyRequest] as Record<string, any>;
        return {
          ...prev,
          [parent]: {
            ...parentObj,
            [child]: value
          }
        };
      });
    } else {
      setFormData(prev => ({
        ...prev,
        [field]: value
      }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Se for virtual, limpa os campos de endereço
    const dataToSubmit: CreateCompanyRequest = formData.is_virtual 
      ? { 
          name: formData.name,
          description: formData.description,
          email: formData.email,
          phone: formData.phone,
          social_media: formData.social_media,
          is_virtual: formData.is_virtual,
          is_active: formData.is_active,
          address: { 
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
          } 
        }
      : formData;
    createCompanyMutation.mutate(dataToSubmit);
  };

  return (
    <Modal show={show} onHide={onHide} size="lg">
      <Modal.Header closeButton>
        <Modal.Title>Adicionar Novo Local</Modal.Title>
      </Modal.Header>
      <Form onSubmit={handleSubmit}>
        <Modal.Body>
          {createCompanyMutation.isError && (
            <Alert variant="danger">
              Erro ao criar local. Tente novamente.
            </Alert>
          )}

          <Row>
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>Nome do Local *</Form.Label>
                <Form.Control
                  type="text"
                  value={formData.name}
                  onChange={(e) => handleInputChange('name', e.target.value)}
                  required
                />
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>Email Institucional (opcional)</Form.Label>
                <Form.Control
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                />
              </Form.Group>
            </Col>
          </Row>

          <Form.Group className="mb-3">
            <Form.Label>Descrição</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              value={formData.description}
              onChange={(e) => handleInputChange('description', e.target.value)}
            />
          </Form.Group>

          <Row>
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>Telefone</Form.Label>
                <Form.Control
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => handleInputChange('phone', e.target.value)}
                />
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Check
                type="checkbox"
                label="Local Virtual"
                checked={formData.is_virtual}
                onChange={(e) => handleInputChange('is_virtual', e.target.checked)}
              />
            </Col>
          </Row>

          {/* Campos de endereço - só aparecem se não for virtual */}
          {!formData.is_virtual && (
            <>
              <hr />
              <h6>Endereço</h6>
              
              <Row>
                <Col md={6}>
                  <Form.Group className="mb-3">
                    <Form.Label>CEP</Form.Label>
                    <Form.Control
                      type="text"
                      value={formData.address.zip_code}
                      onChange={(e) => handleInputChange('address.zip_code', e.target.value)}
                    />
                  </Form.Group>
                </Col>
              </Row>

              <Row>
                <Col md={8}>
                  <Form.Group className="mb-3">
                    <Form.Label>Rua</Form.Label>
                    <Form.Control
                      type="text"
                      value={formData.address.street}
                      onChange={(e) => handleInputChange('address.street', e.target.value)}
                    />
                  </Form.Group>
                </Col>
                <Col md={4}>
                  <Form.Group className="mb-3">
                    <Form.Label>Número</Form.Label>
                    <Form.Control
                      type="text"
                      value={formData.address.number}
                      onChange={(e) => handleInputChange('address.number', e.target.value)}
                    />
                  </Form.Group>
                </Col>
              </Row>

              <Form.Group className="mb-3">
                <Form.Label>Complemento</Form.Label>
                <Form.Control
                  type="text"
                  value={formData.address.complement}
                  onChange={(e) => handleInputChange('address.complement', e.target.value)}
                />
              </Form.Group>

              <Row>
                <Col md={6}>
                  <Form.Group className="mb-3">
                    <Form.Label>Bairro</Form.Label>
                    <Form.Control
                      type="text"
                      value={formData.address.neighbourhood}
                      onChange={(e) => handleInputChange('address.neighbourhood', e.target.value)}
                    />
                  </Form.Group>
                </Col>
                <Col md={6}>
                  <Form.Group className="mb-3">
                    <Form.Label>Cidade</Form.Label>
                    <Form.Control
                      type="text"
                      value={formData.address.city}
                      onChange={(e) => handleInputChange('address.city', e.target.value)}
                    />
                  </Form.Group>
                </Col>
              </Row>

              <Row>
                <Col md={6}>
                  <Form.Group className="mb-3">
                    <Form.Label>Estado</Form.Label>
                    <Form.Control
                      type="text"
                      value={formData.address.state}
                      onChange={(e) => handleInputChange('address.state', e.target.value)}
                    />
                  </Form.Group>
                </Col>
                <Col md={6}>
                  <Form.Group className="mb-3">
                    <Form.Label>País</Form.Label>
                    <Form.Control
                      type="text"
                      value={formData.address.country}
                      onChange={(e) => handleInputChange('address.country', e.target.value)}
                    />
                  </Form.Group>
                </Col>
              </Row>

              <Row>
                <Col md={6}>
                  <Form.Group className="mb-3">
                    <Form.Label>Latitude</Form.Label>
                    <Form.Control
                      type="number"
                      step="any"
                      value={formData.address.latitude}
                      onChange={(e) => handleInputChange('address.latitude', parseFloat(e.target.value) || 0)}
                    />
                  </Form.Group>
                </Col>
                <Col md={6}>
                  <Form.Group className="mb-3">
                    <Form.Label>Longitude</Form.Label>
                    <Form.Control
                      type="number"
                      step="any"
                      value={formData.address.longitude}
                      onChange={(e) => handleInputChange('address.longitude', parseFloat(e.target.value) || 0)}
                    />
                  </Form.Group>
                </Col>
              </Row>
            </>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={onHide}>
            Cancelar
          </Button>
          <Button 
            variant="primary" 
            type="submit"
            disabled={createCompanyMutation.isPending}
          >
            {createCompanyMutation.isPending ? 'Salvando...' : 'Salvar'}
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
}; 
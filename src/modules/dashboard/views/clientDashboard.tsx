const ClientDashboard = () => {
  return (
    <div>
      <h1 className="display-4 mb-4">Área do Paciente</h1>
      <div className="row">
        <div className="col-md-6 mb-4">
          <div className="card">
            <div className="card-body">
              <h5 className="card-title">Meus Agendamentos</h5>
              <p className="card-text">Gerencie suas consultas e exames.</p>
              <ul className="list-unstyled">
                <li>• Próximas consultas</li>
                <li>• Histórico médico</li>
                <li>• Resultados de exames</li>
                <li>• Prescrições</li>
              </ul>
            </div>
          </div>
        </div>
        <div className="col-md-6 mb-4">
          <div className="card">
            <div className="card-body">
              <h5 className="card-title">Comunicação</h5>
              <p className="card-text">Comunicação com profissionais de saúde.</p>
              <ul className="list-unstyled">
                <li>• Mensagens</li>
                <li>• Teleconsulta</li>
                <li>• Documentos</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ClientDashboard
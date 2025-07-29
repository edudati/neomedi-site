const AssistantDashboard = () => {
  return (
    <div>
      <h1 className="display-4 mb-4">Dashboard Assistente</h1>
      <div className="row">
        <div className="col-md-6 mb-4">
          <div className="card">
            <div className="card-body">
              <h5 className="card-title">Agendamentos</h5>
              <p className="card-text">Gestão de consultas e horários.</p>
              <ul className="list-unstyled">
                <li>• Marcar consultas</li>
                <li>• Reagendar horários</li>
                <li>• Cancelamentos</li>
                <li>• Confirmações</li>
              </ul>
            </div>
          </div>
        </div>
        <div className="col-md-6 mb-4">
          <div className="card">
            <div className="card-body">
              <h5 className="card-title">Atendimento ao Cliente</h5>
              <p className="card-text">Suporte e comunicação com pacientes.</p>
              <ul className="list-unstyled">
                <li>• Cadastro de pacientes</li>
                <li>• Atualização de dados</li>
                <li>• Comunicação</li>
                <li>• Documentação</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AssistantDashboard

const ManagerDashboard = () => {
  return (
    <div>
      <h1 className="display-4 mb-4">Dashboard Gerente</h1>
      <div className="row">
        <div className="col-md-6 mb-4">
          <div className="card">
            <div className="card-body">
              <h5 className="card-title">Gestão de Equipe</h5>
              <p className="card-text">Coordenação da equipe local e recursos.</p>
              <ul className="list-unstyled">
                <li>• Gestão de profissionais</li>
                <li>• Agendamentos e horários</li>
                <li>• Relatórios de equipe</li>
                <li>• Controle de qualidade</li>
              </ul>
            </div>
          </div>
        </div>
        <div className="col-md-6 mb-4">
          <div className="card">
            <div className="card-body">
              <h5 className="card-title">Operações Locais</h5>
              <p className="card-text">Controle das operações da clínica/unidade.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ManagerDashboard
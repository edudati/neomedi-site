const AdminDashboard = () => {
  return (
    <div>
      <h1 className="display-4 mb-4">Dashboard Administrativo</h1>
      <div className="row">
        <div className="col-md-6 mb-4">
          <div className="card">
            <div className="card-body">
              <h5 className="card-title">Gestão de Clínicas</h5>
              <p className="card-text">Administração de clínicas e unidades.</p>
              <ul className="list-unstyled">
                <li>• Cadastro de clínicas</li>
                <li>• Configurações de unidades</li>
                <li>• Relatórios financeiros</li>
                <li>• Gestão de contratos</li>
              </ul>
            </div>
          </div>
        </div>
        <div className="col-md-6 mb-4">
          <div className="card">
            <div className="card-body">
              <h5 className="card-title">Controle Operacional</h5>
              <p className="card-text">Monitoramento e controle das operações.</p>
              <ul className="list-unstyled">
                <li>• Métricas de performance</li>
                <li>• Gestão de recursos</li>
                <li>• Compliance e auditoria</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AdminDashboard

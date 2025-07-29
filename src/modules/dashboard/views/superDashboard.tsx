const SuperDashboard = () => {
  return (
    <div>
      <h1 className="display-4 mb-4">Dashboard Super Administrador</h1>
      <div className="row">
        <div className="col-md-6 mb-4">
          <div className="card">
            <div className="card-body">
              <h5 className="card-title">Gestão de Sistema</h5>
              <p className="card-text">Controle total sobre todas as funcionalidades do sistema.</p>
              <ul className="list-unstyled">
                <li>• Gestão de usuários e permissões</li>
                <li>• Configurações globais</li>
                <li>• Logs e auditoria</li>
                <li>• Backup e manutenção</li>
              </ul>
            </div>
          </div>
        </div>
        <div className="col-md-6 mb-4">
          <div className="card">
            <div className="card-body">
              <h5 className="card-title">Relatórios Globais</h5>
              <p className="card-text">Acesso a todos os dados e relatórios do sistema.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SuperDashboard
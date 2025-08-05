export interface WorkspaceState {
  isAuthenticated: boolean;
  user: any;
  isLoading: boolean;
}

export interface WorkspaceContextType {
  workspaceState: WorkspaceState;
  // Adicione métodos específicos do workspace se necessário
} 
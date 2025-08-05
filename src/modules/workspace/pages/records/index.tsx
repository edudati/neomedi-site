import { useState, useEffect } from "react";
import styles from "./index.module.css";
import RecordsLeftPaneHeader from "./components/RecordsLeftPaneHeader";
import CreateRecordForm from "./components/CreateRecordForm";
import CreateVisitModal from "./components/CreateVisitModal";
import CenterPaneHeader from "./components/PatientRecordsList";
import VisitsList from "./components/VisitsList";
import AIChat from "./components/AIChat";
import { visitService } from "./services/visitService";
import { useParams } from "react-router-dom";
import { api } from "../../../shared/services/api";

const WorkspaceRecords = () => {
  const { id } = useParams();
  // VALOR INICIAL: Largura inicial do painel central (cinza) em rem
  const [centerWidth, setCenterWidth] = useState(50); 
  const [isResizing, setIsResizing] = useState(false);
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [showVisitModal, setShowVisitModal] = useState(false);
  const [refreshRecords, setRefreshRecords] = useState<(() => void) | null>(null);
  const [refreshVisits, setRefreshVisits] = useState<(() => void) | null>(null);
  const [loading, setLoading] = useState(false);
  const [patientId, setPatientId] = useState<string>("");

  const startResizing = () => setIsResizing(true);

  const handleMouseMove = (e: MouseEvent) => {
    if (!isResizing) return;

    const leftPaneWidth = 18.75; // Largura fixa do painel esquerdo em rem
    const minRightPaneWidth = 12.5; // Largura mínima do painel direito em rem
    const totalAvailable = (window.innerWidth / 16) - leftPaneWidth - minRightPaneWidth; // 16px = 1rem
    const newWidth = Math.min(Math.max((e.clientX / 16) - leftPaneWidth, 8), totalAvailable); 
    setCenterWidth(newWidth);
  };

  const stopResizing = () => setIsResizing(false);

  // Definir patient_id da URL
  useEffect(() => {
    if (id) {
      setPatientId(id);
      console.log("✅ Patient ID definido da URL:", id);
    }
  }, [id]);

    const handleCreateVisit = async (data: any) => {
    if (!patientId) {
      console.error("❌ Patient ID não disponível ainda!");
      return;
    }
    
    setLoading(true);
    try {
      console.log("=== DEBUG CREATE VISIT ===");
      console.log("Patient ID da URL:", id);
      console.log("Patient ID correto:", patientId);
      console.log("Patient ID está vazio?", !patientId);
      console.log("Dados completos sendo enviados:", JSON.stringify(data, null, 2));
      console.log("Tipo de dados:", typeof data);
      console.log("Keys do objeto:", Object.keys(data));
      console.log("==========================");
      
      await visitService.createVisit(data);
      console.log("Atendimento criado com sucesso!");
      
      // Recarregar lista de visitas após criar novo atendimento
      if (refreshVisits) {
        refreshVisits();
      }
      
      // Fechar modal
      setShowVisitModal(false);
    } catch (error: any) {
      console.error("Erro ao criar atendimento:", error);
      console.error("Response data:", error.response?.data);
      console.error("Response status:", error.response?.status);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseup", stopResizing);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", stopResizing);
    };
  });

  return (
    <div className={`${styles.container} workspace-container`}>
      <div className={styles.leftPane}>
        <RecordsLeftPaneHeader 
          onAddRecord={() => setShowCreateForm(true)}
          onAddVisit={() => setShowVisitModal(true)}
          hasRecord={!!id}
        />
      </div>

      <div className={styles.centerPane} style={{ width: `${centerWidth}rem` }}>
        {showCreateForm ? (
          <CreateRecordForm 
            onClose={() => setShowCreateForm(false)}
            onSuccess={() => {
              setShowCreateForm(false);
              // Recarregar lista após criar record
              if (refreshRecords) {
                refreshRecords();
              }
            }}
          />
                               ) : (
          <>
            <CenterPaneHeader onRefresh={setRefreshRecords} />
            <div className="mt-2">
              <VisitsList onRefresh={setRefreshVisits} />
            </div>
          </>
        )}
      </div>

      <div
        className={styles.divider}
        onMouseDown={startResizing}
      />

      <div className={styles.rightPane}>
        <AIChat />
      </div>

                                                                                                               {patientId && (
                               <CreateVisitModal
                                 isOpen={showVisitModal}
                                 onClose={() => setShowVisitModal(false)}
                                 onSubmit={handleCreateVisit}
                                 loading={loading}
                                 patientId={patientId}
                               />
                             )}
    </div>
  );
};

export default WorkspaceRecords;

import { useState, useEffect } from "react";
import styles from "./index.module.css";
import RecordsLeftPaneHeader from "./components/RecordsLeftPaneHeader";
import CreateRecordForm from "./components/CreateRecordForm";
import PatientRecordsList from "./components/PatientRecordsList";
import AIChat from "./components/AIChat";

const WorkspaceRecords = () => {
  // VALOR INICIAL: Largura inicial do painel central (cinza) em rem
  const [centerWidth, setCenterWidth] = useState(50); 
  const [isResizing, setIsResizing] = useState(false);
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [refreshRecords, setRefreshRecords] = useState<(() => void) | null>(null);

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
        <RecordsLeftPaneHeader onAddRecord={() => setShowCreateForm(true)} />
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
          <PatientRecordsList onRefresh={setRefreshRecords} />
        )}
      </div>

      <div
        className={styles.divider}
        onMouseDown={startResizing}
      />

      <div className={styles.rightPane}>
        <AIChat />
      </div>
    </div>
  );
};

export default WorkspaceRecords;

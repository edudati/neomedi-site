import React, { useState, useEffect } from "react";
import styles from "./index.module.css";
import LeftPaneHeader from "./components/leftPaneHeader";
import SearchBox from "./components/SearchBox";
import PatientCard from "./components/patientCard";

const WorkspaceHome = () => {
  // VALOR INICIAL: Largura inicial do painel central (cinza) em rem
  const [centerWidth, setCenterWidth] = useState(50); 
  const [isResizing, setIsResizing] = useState(false);

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
        <LeftPaneHeader />
      </div>

      <div className={styles.centerPane} style={{ width: `${centerWidth}rem` }}>
        <SearchBox />
        
        {/* Lista de pacientes - apenas para visualização */}
        <div className={styles.patientsList}>
          <PatientCard
            name="Maria Silva"
            phone="(11) 99999-8888"
            email="maria.silva@email.com"
            age="32 anos"
            lastVisit="15/01/2024"
            tags={["Ativo", "Retorno"]}
          />
          
          <PatientCard
            name="João Santos"
            phone="(11) 88888-7777"
            email="joao.santos@email.com"
            age="45 anos"
            lastVisit="10/01/2024"
            tags={["Ativo"]}
          />
          
          <PatientCard
            name="Ana Costa"
            phone="(11) 77777-6666"
            email="ana.costa@email.com"
            age="28 anos"
            lastVisit="08/01/2024"
            tags={["Ativo", "Primeira Consulta"]}
          />
        </div>
      </div>

      <div
        className={styles.divider}
        onMouseDown={startResizing}
      />

      <div className={styles.rightPane} />
    </div>
  );
};

export default WorkspaceHome;

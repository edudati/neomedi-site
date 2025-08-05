import { useState, useEffect, useMemo } from "react";
import styles from "./index.module.css";
import LeftPaneHeader from "./components/leftPaneHeader";
import SearchBox from "./components/SearchBox";
import PatientCard from "./components/PatientCard";
import CreatePatientModal from "./components/CreatePatientModal";
import { usePatients } from "../../../patients/hooks/usePatients";
import { formatAge } from "../../../patients/utils/dateUtils";
import type { CreatePatientFormData } from "../../../patients/types/patient.types";

const WorkspaceHome = () => {
  // VALOR INICIAL: Largura inicial do painel central (cinza) em rem
  const [centerWidth, setCenterWidth] = useState(50); 
  const [isResizing, setIsResizing] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { patients, loading, error, createPatient } = usePatients();

  // Filtrar pacientes baseado no termo de pesquisa
  const filteredPatients = useMemo(() => {
    if (!searchTerm.trim()) return patients;
    
    return patients.filter(patient =>
      patient.user.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [patients, searchTerm]);

  const handleOpenModal = () => setIsModalOpen(true);
  const handleCloseModal = () => setIsModalOpen(false);

  const handleCreatePatient = async (formData: CreatePatientFormData) => {
    await createPatient(formData);
  };

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
        <LeftPaneHeader onAddPatient={handleOpenModal} />
      </div>

      <div className={styles.centerPane} style={{ width: `${centerWidth}rem` }}>
        <SearchBox searchTerm={searchTerm} onSearchChange={setSearchTerm} />
        
        {/* Lista de pacientes */}
        <div className={styles.patientsList}>
          {loading && <div>Carregando pacientes...</div>}
          {error && <div style={{ color: 'red' }}>Erro: {error}</div>}
          {!loading && !error && filteredPatients.length === 0 && searchTerm.trim() && (
            <div>Nenhum paciente encontrado com o nome "{searchTerm}"</div>
          )}
          {!loading && !error && filteredPatients.map((patient) => (
            <PatientCard
              key={patient.user_id}
              name={patient.user.name}
              phone={patient.user.phone}
              email={patient.user.email}
              age={formatAge(patient.user.birth_date)}
            />
          ))}
        </div>
      </div>

      <div
        className={styles.divider}
        onMouseDown={startResizing}
      />

      <div className={styles.rightPane} />

      <CreatePatientModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onSubmit={handleCreatePatient}
        loading={loading}
      />
    </div>
  );
};

export default WorkspaceHome;

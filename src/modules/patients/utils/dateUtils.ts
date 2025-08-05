/**
 * Calcula a idade a partir da data de nascimento
 * @param birthDate - Data de nascimento no formato ISO string
 * @returns Idade em anos
 */
export const calculateAge = (birthDate: string): number => {
  const birth = new Date(birthDate);
  const today = new Date();
  
  let age = today.getFullYear() - birth.getFullYear();
  const monthDiff = today.getMonth() - birth.getMonth();
  
  if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth.getDate())) {
    age--;
  }
  
  return age;
};

/**
 * Formata a idade para exibição
 * @param birthDate - Data de nascimento no formato ISO string
 * @returns String formatada (ex: "32 anos")
 */
export const formatAge = (birthDate: string): string => {
  const age = calculateAge(birthDate);
  return `${age} anos`;
};
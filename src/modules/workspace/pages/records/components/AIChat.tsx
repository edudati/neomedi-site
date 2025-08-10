import { useParams } from 'react-router-dom';
import AIChat from '@/modules/shared/components/AIChat';
import { recordTags } from '@/modules/shared/components/AIChat/data/tags';

const RecordAIChat = () => {
  const { id } = useParams<{ id: string }>();

  return (
    <AIChat 
      context="records"
      recordId={id}
      tags={recordTags}
    />
  );
};

export default RecordAIChat;
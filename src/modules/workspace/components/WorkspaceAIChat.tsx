import AIChat from '@/modules/shared/components/AIChat';
import { workspaceTags } from '@/modules/shared/components/AIChat/data/tags';

const WorkspaceAIChat = () => {
  return (
    <AIChat 
      context="workspace"
      tags={workspaceTags}
    />
  );
};

export default WorkspaceAIChat;

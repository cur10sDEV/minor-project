import NameModal from "../modals/NameModal";
import PlanModal from "../modals/PlanModal";

const ModalProvider = () => {
  return (
    <div className="fixed">
      <NameModal />
      <PlanModal />
    </div>
  );
};
export default ModalProvider;

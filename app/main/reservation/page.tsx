import AboutSectionOne from "@/components/About/Reservation";
import Breadcrumb from "@/components/Common/Breadcrumb";


const ReservationPage = () => {

  return (
    <>
    
      <Breadcrumb
        pageName="Réservation"
        description="Réservez votre billet en quelques clics et partez à la découverte de nouveaux horizons."  />
      <AboutSectionOne />
    </>
  );
};

export default ReservationPage;

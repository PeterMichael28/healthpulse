import Image from 'next/image';

// import { AppointmentForm } from "@/components/forms/AppointmentForm";
import { getPatient, getUser } from '@/lib/actions/patient.actions';
import { AppointmentForm } from '@/components/forms/AppointmentForm';
import * as Sentry from '@sentry/nextjs';

const Appointment = async ({
    params: { userId },
}: SearchParamProps) => {
    const user = await getUser(userId);
    const patient = await getPatient(user?.email);
    //   console.log('first', patient);
    Sentry.metrics.set('user_view_appointment', user?.name);
 return (
  <div className="flex h-screen max-h-screen">
   <section className="remove-scrollbar container my-auto">
    <div className="sub-container max-w-[860px] flex-1 justify-between">
     <Image
      src="/assets/icons/logo-full.svg"
      height={1000}
      width={1000}
      alt="logo"
      className="mb-12 h-10 w-fit"
     />

     <AppointmentForm
      patientId={patient?.$id}
      userId={userId}
      type="create"
     />

     <p className="copyright mt-10 py-12">© 2024 CarePluse</p>
    </div>
   </section>

   <Image
    src="/assets/images/appointment-img.png"
    height={1500}
    width={1500}
    alt="appointment"
    className="side-img max-w-[450px] bg-bottom"
   />
  </div>
 );
};

export default Appointment;

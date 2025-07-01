import ContactFAQ from "./ContactFaq";
import ContactForm from "./ContactForm";
import ContactHero from "./ContactHero";
import ContactMethods from "./ContactMethods";

const ContactPage = () => {
  return (
    <div className="bg-white dark:bg-gray-900">
      <ContactHero />
      <ContactMethods />
      <ContactForm />
      <ContactFAQ />
    </div>
  );
};

export default ContactPage;

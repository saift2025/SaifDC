
import React from 'react';
import ActionButton from './components/ActionButton';
import { PhoneIcon } from './components/icons/PhoneIcon';
import { SaveIcon } from './components/icons/SaveIcon';
import { WhatsappIcon } from './components/icons/WhatsappIcon';
import { EmailIcon } from './components/icons/EmailIcon';

// --- Contact Details ---
const CONTACT_DETAILS = {
  name: 'Saifullah Tameem',
  title: 'Web & App Developer',
  phone: '+917810026499',
  phoneBare: '917810026499',
  email: 'contact@saifullahtameem.com', // Placeholder email
};

// --- vCard Generation ---
const generateVCard = () => {
  const vCard = `BEGIN:VCARD
VERSION:3.0
FN:${CONTACT_DETAILS.name}
TITLE:${CONTACT_DETAILS.title}
TEL;TYPE=CELL:${CONTACT_DETAILS.phone}
EMAIL:${CONTACT_DETAILS.email}
END:VCARD`;
  return vCard;
};

const App: React.FC = () => {
  const handleSaveContact = () => {
    const vCardData = generateVCard();
    const blob = new Blob([vCardData], { type: 'text/vcard;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `${CONTACT_DETAILS.name.replace(' ', '_')}.vcf`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <main className="min-h-screen w-full bg-slate-900 bg-gradient-to-br from-gray-900 via-slate-900 to-black flex items-center justify-center p-4">
      <div className="relative w-full max-w-sm mx-auto">
        {/* Decorative background shapes */}
        <div className="absolute -top-10 -left-10 w-48 h-48 bg-purple-500 rounded-full mix-blend-lighten filter blur-3xl opacity-40 animate-blob"></div>
        <div className="absolute -bottom-10 -right-10 w-48 h-48 bg-sky-500 rounded-full mix-blend-lighten filter blur-3xl opacity-40 animate-blob animation-delay-2000"></div>

        <div className="relative bg-white/10 backdrop-blur-xl rounded-2xl shadow-2xl overflow-hidden border border-white/20">
          <div className="p-8 text-center text-white">
            <div className="mb-6">
              <img
                src="https://picsum.photos/seed/saifullah/200"
                alt="Saifullah Tameem"
                className="w-32 h-32 rounded-full mx-auto border-4 border-white/30 shadow-lg"
              />
            </div>
            <h1 className="text-4xl font-bold tracking-tight">
              {CONTACT_DETAILS.name}
            </h1>
            <p className="text-lg text-sky-300 mt-2 font-medium">
              {CONTACT_DETAILS.title}
            </p>
          </div>
          <div className="p-6 bg-black/20 space-y-4">
            <ActionButton
              href={`tel:${CONTACT_DETAILS.phone}`}
              icon={<PhoneIcon />}
              text="Call Me"
            />
            <ActionButton
              onClick={handleSaveContact}
              icon={<SaveIcon />}
              text="Save Contact"
            />
            <ActionButton
              href={`https://wa.me/${CONTACT_DETAILS.phoneBare}`}
              target="_blank"
              rel="noopener noreferrer"
              icon={<WhatsappIcon />}
              text="Message on WhatsApp"
            />
            <ActionButton
              href={`mailto:${CONTACT_DETAILS.email}`}
              icon={<EmailIcon />}
              text="Send an Email"
            />
          </div>
        </div>
      </div>
       <style>{`
        .animate-blob {
          animation: blob 7s infinite;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        @keyframes blob {
          0% {
            transform: translate(0px, 0px) scale(1);
          }
          33% {
            transform: translate(30px, -50px) scale(1.1);
          }
          66% {
            transform: translate(-20px, 20px) scale(0.9);
          }
          100% {
            transform: translate(0px, 0px) scale(1);
          }
        }
      `}</style>
    </main>
  );
};

export default App;

'use client';
import { Button } from '@/components/ui/button';
import QRCode from 'qrcode';
import { useState, useEffect } from 'react';
import Image from 'next/image';
import { fetchSession } from '@/utils/actions/fetchSession';
import { Input } from '@/components/ui/input';
import { Copy } from 'lucide-react';

const QRCodeGenerator = () => {
    const [qrCodeUrl, setQrCodeUrl] = useState<string | null>(null);
    const [userID, setUserID] = useState<string | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [inputValue, setInputValue] = useState('');

    const handleCopy = async () => {
        if (inputValue) {
            await navigator.clipboard.writeText(inputValue);
            // alert('Текст скопирован!');
        }
    };

    useEffect(() => {
        const getSession = async () => {
            const { session, error } = await fetchSession();
            if (error) {
                setError(error);
            } else if (session) {
                setUserID(session.id);
            }
        };
        getSession();
    }, []);

    const generateQRCode = async () => {
        try {
            const qrCodeText = `https://booksphera.ru/${userID}`;
            const url = await QRCode.toDataURL(qrCodeText);
            setQrCodeUrl(url);
            setInputValue(qrCodeText); // Устанавливаем значение inputValue
        } catch (error) {
            console.error('Ошибка генерации QR-кода:', error);
        }
    };

    if (error) {
        return <p className="text-red-500">{error}</p>;
    }

    return (
        <div className="flex flex-col items-center p-4 space-y-4 w-full max-w-xs mx-auto">
            {qrCodeUrl && (
                <div className="flex flex-col items-center space-y-2">
                    <Image
                        src={qrCodeUrl}
                        width={200}
                        height={200}
                        alt="QR code"
                        style={{ objectFit: 'cover' }}
                        className="w-[200px] h-[200px] max-w-full object-cover"
                    />
                    <a href={qrCodeUrl} download="qrcode.png" className="text-blue-500 underline">
                        Скачать QR-код
                    </a>
                </div>
            )}
            <Button onClick={generateQRCode} variant="default" className="w-full">
                Сгенерировать QR-код
            </Button>

            <div className="relative w-full max-w-xs mx-auto flex items-center">
                <Input
                    type="text"
                    placeholder="QR код не сгенерирован"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    className="pr-12 "
                />
                <Button
                    onClick={handleCopy}
                    variant="ghost"
                    size="icon"
                    className="absolute right-2 top-1/2 transform -translate-y-1/2"
                >
                    <Copy className="w-5 h-5" />
                </Button>
            </div>
        </div>
    );
};

export default QRCodeGenerator;




// 'use client';
// import { Button } from '@/components/ui/button';
// // import { Input } from '@/components/ui/input';
// import QRCode from 'qrcode';
// import { useState, useEffect } from 'react';
// import Image from 'next/image';
// import { fetchSession } from '@/utils/actions/fetchSession';
// import { Input } from '@/components/ui/input';
// import { Copy } from 'lucide-react';

// const QRCodeGenerator = () => {
//     // const [text, setText] = useState('');
//     const [qrCodeUrl, setQrCodeUrl] = useState<string | null>(null);
//     const [userID, setUserID] = useState<string | null>(null);
//     const [error, setError] = useState<string | null>(null);
//     const [inputValue, setInputValue] = useState(''); // состояние для хранения текста
    
//     const handleCopy = async () => {
//         if (inputValue) {
//           await navigator.clipboard.writeText(inputValue); // копирование текста в буфер обмена
//           alert('Текст скопирован!');
//         }
//       };

//     useEffect(() => {
//         const getSession = async () => {
//             const { session, error } = await fetchSession();

//             if (error) {
//                 setError(error);
//             } else if (session) {
//                 setUserID(session.user.id);
//             }
//         };

//         getSession();
//     }, []);

//     const generateQRCode = async () => {
//         try {
//             const url = await QRCode.toDataURL('https://booksphera.ru/' + userID);
//             setQrCodeUrl(url);
//         } catch (error) {
//             console.error('Ошибка генерации QR-кода:', error);
//         }
//     };

//     if (error) {
//         return <p className="text-red-500">{error}</p>;
//     }

//     return (
//         <div className="flex flex-col items-center p-4 space-y-4 w-full max-w-xs mx-auto">
//             {/* <Input
//                 value={text}
//                 onChange={(e) => setText(e.target.value)}
//                 placeholder="Введите текст для QR-кода"
//                 className="w-full"
//             /> */}
            
//             {qrCodeUrl && (
//                 <div className="flex flex-col items-center space-y-2">
//                     <Image
//                         src={qrCodeUrl}
//                         width={200}
//                         height={200}
//                         alt="QR code"
//                         style={{ objectFit: "cover" }}
//                         className="w-[200px] h-[200px] max-w-full object-cover"
//                     />
//                     <a href={qrCodeUrl} download="qrcode.png" className="text-blue-500 underline">
//                         Скачать QR-код
//                     </a>
//                 </div>
//             )}
//             <Button onClick={generateQRCode} variant="default" className="w-full">
//                 Сгенерировать QR-код
//             </Button>

//             <div className="relative">
//       <Input
//         type="text"
//         placeholder="Введите текст для копирования"
//         value={inputValue}
//         onChange={(e) => setInputValue(e.target.value)}
//         className="pr-12" // Оставляем место для кнопки внутри инпута
//       />
//       <Button
//         onClick={handleCopy}
//         variant="ghost"
//         size="icon"
//         className="absolute right-2 top-1/2 transform -translate-y-1/2"
//       >
//         <Copy className="w-5 h-5" />
//       </Button>
//     </div>
//         </div>
//     );
// };

// export default QRCodeGenerator;




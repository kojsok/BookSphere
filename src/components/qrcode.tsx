import QRCode from 'qrcode';
import { useEffect, useState } from 'react';
import Image from 'next/image';

interface QrCodeProps {
    ownerId: string;
}

const QrCode: React.FC<QrCodeProps> = ({ ownerId }) => {
    const [qrCodeUrl, setQrCodeUrl] = useState<string | null>(null);

    useEffect(() => {
        const generateQRCode = async () => {
            try {
                const qrCodeText = `https://booksphera.ru/${ownerId}`;
                const url = await QRCode.toDataURL(qrCodeText);
                setQrCodeUrl(url);
            } catch (error) {
                console.error('Ошибка генерации QR-кода:', error);
            }
        };

        generateQRCode();
    }, [ownerId]);

    if (!qrCodeUrl) return null;

    return (
        <div className="flex flex-col items-center space-y-2">
            <Image
                src={qrCodeUrl}
                width={200}
                height={200}
                alt="QR code"
                style={{ objectFit: 'cover' }}
                className="w-[300px] h-[300px] max-w-full object-fit rounded-lg"
            />
            <a href={qrCodeUrl} download="qrcode.png" className="text-blue-500 underline">
                Скачать QR-код
            </a>
        </div>
    );
};

export default QrCode;

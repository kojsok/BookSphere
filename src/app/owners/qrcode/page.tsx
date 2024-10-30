'use client';
import { Button } from '@/components/ui/button';
import QRCode from 'qrcode';
import { useState, useEffect } from 'react';
import Image from 'next/image';
import { fetchSession } from '@/utils/actions/fetchSession';
import { Input } from '@/components/ui/input';
import { Copy, Share } from 'lucide-react';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

const QRCodeGenerator = () => {
    const [qrCodeUrl, setQrCodeUrl] = useState<string | null>(null);
    const [userID, setUserID] = useState<string | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [inputValue, setInputValue] = useState('');

    const handleCopy = async () => {
        if (inputValue) {
            await navigator.clipboard.writeText(inputValue);
        }
    };

    const handleShare = async () => {
        if (navigator.share && userID) {
            try {
                const qrCodeText = `https://booksphera.ru/${userID}`;
                await navigator.share({
                    title: 'Моя страница для записи:',
                    text: 'Вы можете перейти на мою страницу по этой ссылке и записаться на услугу. Спасибо за ваш выбор!',
                    url: qrCodeText,
                });
            } catch (error: unknown) {
                if (error instanceof Error) {
                    console.error('Ошибка при попытке поделиться либо пользователь прервал sharing:', error.message);
                } else {
                    console.error('An unknown error occurred:', error);
                }
                if ((error as Error)?.name !== 'AbortError') {
                    console.error('Ошибка при попытке поделиться:', error);
                }
            }
        } else {
            alert('Web Share API не поддерживается вашим устройством.'); //можно убрать
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
            setInputValue(qrCodeText);
        } catch (error) {
            console.error('Ошибка генерации QR-кода:', error);
        }
    };

    if (error) {
        return <p className="text-red-500">{error}</p>;
    }

    return (
        <div className="flex flex-col items-center p-4 space-y-4 w-full max-w-md mx-auto">
            {qrCodeUrl && (
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
            )}
            {/* Анимация добавлена для наглядности */}
            <Button onClick={generateQRCode} variant="default" className="w-full  max-w-xs animate-bounce duration-800 hover:animate-pulse">
                Сгенерировать QR-код
            </Button>

            <div className="flex flex-row w-full max-w-xs mx-auto">
                <div className="relative w-full max-w-xs mx-auto flex items-center">
                    <Input
                        type="text"
                        placeholder="QR код не сгенерирован"
                        value={inputValue}
                        onChange={(e) => setInputValue(e.target.value)}
                        className="pr-12 "
                    />
                    <TooltipProvider>
                        <Tooltip>
                            <TooltipTrigger asChild>
                                <Button
                                    onClick={handleCopy}
                                    variant="ghost"
                                    size="icon"
                                    className="absolute right-0 top-1/2 transform -translate-y-1/2"
                                >
                                    <Copy className="w-5 h-5" />
                                </Button>
                            </TooltipTrigger>
                            <TooltipContent>
                                Скопировать
                            </TooltipContent>
                        </Tooltip>
                    </TooltipProvider>
                </div>
                <TooltipProvider>
                    <Tooltip>
                        <TooltipTrigger asChild>
                            {qrCodeUrl && (
                                <Button onClick={handleShare} variant="ghost" size="icon" className="">
                                    <Share className="w-5 h-5" />
                                </Button>
                            )}
                        </TooltipTrigger>
                        <TooltipContent>
                            Поделиться
                        </TooltipContent>
                    </Tooltip>
                </TooltipProvider>
            </div>
        </div>
    );
};

export default QRCodeGenerator;
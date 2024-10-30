import { Label } from "@radix-ui/react-label";
import { Input } from "../ui/input";
import { ReactNode } from "react";
import { cn } from "@/lib/utils";



interface InputSampleProps {
  children: ReactNode,
  className?: string,
  As?: keyof JSX.IntrinsicElements
}

/**
 * Компонент `InputSample` размещает переданные дочерние элементы (`children`)
 * в абсолютном положении относительно родительского контейнера. Подходит для
 * добавления иконок или текстовых элементов, размещённых поверх других полей.
 *
 * @param {InputSampleProps} props - Свойства компонента.
 * @param {ReactNode} props.children - Контент внутри компонента.
 * @param {string} [props.className] - Дополнительные CSS-классы.
 * @param {ElementType} [props.As="span"] - HTML-тег или компонент, используемый в качестве контейнера.
 *
 * @example
 * ```tsx
 * <InputSample As="div" className="custom-class">
 *   <span>Пример текста</span>
 * </InputSample>
 * ```
 */

export const InputSample = ({ children, className, As = 'span', ...props }: InputSampleProps) => {
  return (
    <As className={cn(
      'absolute right-2 top-[50%] -translate-y-[50%]',
      className
    )}{...props}>{children}</As>
  )
}

interface InputFieldProps {
  label?: string,
  id: string,
  required?: boolean,

  children?: ReactNode
  [key: string]: unknown,
}

/**
 * Компонент `InputField` отображает текстовое поле с привязанной меткой и 
 * позволяет добавить дополнительные элементы (например, иконки или текст) под полем ввода.
 *
 * @param {InputFieldProps} props - Свойства компонента.
 * @param {string} [props.label] - Метка для поля ввода.
 * @param {string} props.id - Уникальный идентификатор для связывания поля ввода и метки.
 * @param {ReactNode} [props.children] - Дополнительные элементы, отображаемые под полем ввода.
 *
 * @example
 * ```tsx
 * <InputField id="username" label="Username">
 *   <span className="text-xs text-gray-500">Введите имя пользователя</span>
 * </InputField>
 * ```
 */
const InputField = ({ label = '', id, required = false, children, ...props }: InputFieldProps) => {
  return (
    <div>
      {label && <Label htmlFor={id} className="text-xs inline-block mb-1.5">
        {label}
        {required && <span> *</span>}
      </Label>}
      <div className="relative">
        <Input {...props} id={id} />
        {children}
      </div>
    </div>
  );
}

export default InputField;
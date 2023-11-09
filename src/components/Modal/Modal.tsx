import { Dialog } from '@radix-ui/themes';

import type { Screen } from '@src/styles/breakpoints';

import * as cls from './styles.css';

interface Props extends React.ComponentProps<typeof Dialog.Root> {
  title?: string;
  description?: string;
  contentProps?: React.ComponentProps<typeof Dialog.Content>;
  trigger?: React.ReactNode;
  width?: Screen;
}

const Modal: React.FC<Props> = ({ title, description, children, contentProps, trigger, width = 'xs', ...props }) => {
    return (
        <Dialog.Root {...props}>
            {trigger ? <Dialog.Trigger>{trigger}</Dialog.Trigger> : null}
            <Dialog.Content data-width={width} className={cls.content} {...contentProps}>
                {title ? <Dialog.Title>{title}</Dialog.Title> : null}
                {description ? (
                    <Dialog.Description size="2" mb="4">
                        {description}
                    </Dialog.Description>
                ) : null}
                {children}
            </Dialog.Content>
        </Dialog.Root>
    );
};

export default Modal;

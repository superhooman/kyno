import { Dialog } from '@radix-ui/themes';

import * as cls from './styles.css';

interface Props extends React.ComponentProps<typeof Dialog.Root> {
  title?: string;
  description?: string;
  contentProps?: React.ComponentProps<typeof Dialog.Content>;
  trigger?: React.ReactNode;
}

const Modal: React.FC<Props> = ({ title, description, children, contentProps, trigger, ...props }) => {
    return (
        <Dialog.Root {...props}>
            {trigger ? <Dialog.Trigger>{trigger}</Dialog.Trigger> : null}
            <Dialog.Content className={cls.content} {...contentProps}>
                {title ? <Dialog.Title>Edit profile</Dialog.Title> : null}
                {description ? (
                    <Dialog.Description size="2" mb="4">
            Make changes to your profile.
                    </Dialog.Description>
                ) : null}
                {children}
            </Dialog.Content>
        </Dialog.Root>
    );
};

export default Modal;

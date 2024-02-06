import { Dialog, ScrollArea } from '@radix-ui/themes';
import { useMediaQuery } from 'usehooks-ts';
import { Drawer } from 'vaul';

import { media, type Screen } from '@src/styles/breakpoints';

import * as cls from './styles.css';


interface Props extends React.ComponentProps<typeof Dialog.Root> {
  title?: string;
  description?: string;
  contentProps?: React.ComponentProps<typeof Dialog.Content>;
  trigger?: React.ReactNode;
  width?: Screen;
  useDrawer?: boolean;
}

const Modal: React.FC<Props> = ({ title, description, children, contentProps, trigger, width = 'xs', useDrawer, ...props }) => {
    const isMobile = useMediaQuery(media.down('sm'));

    if (isMobile && useDrawer) {
        return (
            <Drawer.Root {...props}>
                {trigger ? <Drawer.Trigger asChild>{trigger}</Drawer.Trigger> : null}
                <Drawer.Portal container={document.getElementById('vaul')}>
                    <Drawer.Content className={cls.vaul}>
                        <ScrollArea className={cls.vaulInner} type="scroll" scrollbars="vertical">
                            {children}
                        </ScrollArea>
                    </Drawer.Content>
                    <Drawer.Overlay className={cls.vaulOverlay} />
                </Drawer.Portal>
            </Drawer.Root>
        );
    }

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

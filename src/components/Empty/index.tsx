import { NewspaperClipping } from '@phosphor-icons/react';
import { Flex, Text } from '@radix-ui/themes';

import { useI18n } from '@src/locales/client';

interface Props {
  title?: string;
}

export const Empty: React.FC<Props> = ({ title }) => {
    const t = useI18n();

    const text = title || t('empty');

    return (
        <Flex height="100%" direction="column" align="center" justify="center" gap="2" py="8" grow="1">
            <NewspaperClipping height={20} width={20} />
            <Text size="2" color="gray">{text}</Text>
        </Flex>
    );
};

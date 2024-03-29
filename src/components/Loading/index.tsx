import { Flex, Text } from '@radix-ui/themes';

import { LoadingIcon } from '../Icon';
import { loader } from './styles.css';

export const Loader: React.FC<{ size?: number }> = ({ size = 16 }) => (
    <LoadingIcon className={loader} size={size} />
);

export const LoadingContainer: React.FC<{ title?: string, grow?: boolean }> = ({ title = 'Loading...', grow }) => (
    <Flex grow={grow ? '1' : '0'} direction="column" align="center" justify="center" gap="2" py="8">
        <Loader />
        <Text size="2" color="gray">{title}</Text>
    </Flex>
);

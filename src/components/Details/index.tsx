import { Flex, Separator, Text } from '@radix-ui/themes';

interface DetailsProps {
    items: [string, string][]
}

export const Details: React.FC<DetailsProps> = ({ items }) => {
    return (
        <Flex direction="column" gap="1">
            {items.map(([title, description]) => (
                <Flex key={title} align="center" gap="2">
                    <Flex shrink="0">
                        <Text size="2" weight="bold">{title}</Text>
                    </Flex>
                    <Separator size="4" />
                    <Flex shrink="0">
                        <Text size="2">{description}</Text>
                    </Flex>
                </Flex>
            ))}
        </Flex>
    );
};

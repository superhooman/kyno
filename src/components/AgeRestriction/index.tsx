import { Badge, Text } from '@radix-ui/themes';

interface AgeRestrictionProps {
    ageRestriction?: number;
    className?: string;
    size?: React.ComponentProps<typeof Badge>['size'];
}

const getRestrictionGradation = (ageRestriction: number) => {
    if (ageRestriction >= 18) {
        return 'red';
    }
  
    if (ageRestriction >= 16) {
        return 'orange';
    }
  
    if (ageRestriction >= 12) {
        return 'yellow';
    }
  
    return 'green';
};

export const AgeRestriction: React.FC<AgeRestrictionProps> = ({ ageRestriction, className, size }) => {
    if (!ageRestriction) return null;

    return (
        <Badge
            color={getRestrictionGradation(ageRestriction)}
            className={className}
            variant="solid"
            radius="full"
            size={size}
        >
            <Text weight="bold">{ageRestriction}+</Text>
        </Badge>
    );
};

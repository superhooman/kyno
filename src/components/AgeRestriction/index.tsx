import { Badge } from '@radix-ui/themes';

interface AgeRestrictionProps {
    ageRestriction?: number;
    className?: string;
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

export const AgeRestriction: React.FC<AgeRestrictionProps> = ({ ageRestriction, className }) => {
    if (!ageRestriction) return null;

    return (
        <Badge
            color={getRestrictionGradation(ageRestriction)}
            className={className}
            variant="solid"
            radius="full"
        >
            {ageRestriction}+
        </Badge>
    );
};

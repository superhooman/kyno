import { Container, Flex, Heading, Text } from '@radix-ui/themes';
import Image from 'next/image';

const TEXT = [
    'Я обращаюсь к вам, чтобы поделиться своим опытом взаимодействия с вашей компанией в контексте моего проекта kyno.kz.',

    'Я хочу обратить ваше внимание на важность поддержки инноваций и открытого диалога. Как ученик Назарбаев Университета, я стремлюсь к развитию и улучшению пользовательского опыта в цифровой сфере. Мой проект kyno.kz был разработан как демонстрация потенциала для улучшения существующего kino.kz, и я не имел намерения нанести вред вашему бизнесу.',

    'К сожалению, после связи с Вами я получил анонимное сообщение с требованием удалить проект и угрозами судебных исков. Подобный подход к решению вопросов кажется мне несоответствующим ценностям компании, которая занимает лидирующие позиции на рынке и является примером для многих других.',

    'Я верю, что HalykBank ценит новаторство, открытость и конструктивный диалог. Поэтому я хотел бы предложить обсудить возможные пути сотрудничества и взаимодействия, которые могли бы приносить пользу как вашему бизнесу, так и потребителям.',

    'Я уже придпринял меры, закрыл доступ к сайту и связался с вашим руководством, уведомив их о ситуации.',
];

export default function Page() {
    return (
        <>
            <Container size="1" px="4" py="6">
                <Heading align="center" color="gray" size="3">Здесь был kyno.kz</Heading>
                <div style={{ position: 'relative', margin: 'var(--space-6) 0' }}>
                    <div style={{ position: 'relative', paddingTop: '69.56%' }}>
                        <Image fill src="/img/desktop.png" alt="Desktop Screenshot" />
                    </div>
                    <div style={{ position: 'absolute', top: 0, right: 0, width: '30%', overflow: 'hidden', borderRadius: 4, boxShadow: '0 0 0 1px var(--gray-a6)' }}>
                        <div style={{ position: 'relative', paddingTop: '216.79%' }}>
                            <Image fill src="/img/phone.jpeg" alt="Phone Screenshot" />
                        </div>
                    </div>
                </div>
                <Flex direction="column" gap="4">
                    <Heading align="center" size="5">Это обращение к сотрудникам HalykBank</Heading>
                    {TEXT.map((text, index) => (
                        <Text size="3" as="p" key={index}>{text}</Text>
                    ))}
                </Flex>
            </Container>
        </>
    );
};

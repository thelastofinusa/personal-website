import { MessageBubble } from "@/components/shared/bubble";
import { Wrapper } from "@/components/shared/wrapper";
import { homeMessages } from "@/lib/constants";

export const MessagesSection = () => {
  return (
    <div className="w-full pt-8 pb-10 sm:py-12">
      <Wrapper>
        <MessageBubble messages={homeMessages} />
      </Wrapper>
    </div>
  );
};

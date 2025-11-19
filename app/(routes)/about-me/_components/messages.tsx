import { MessageBubble } from "@/components/shared/bubble";
import { Wrapper } from "@/components/shared/wrapper";
import { aboutMessages } from "@/lib/constants";

export const MessagesSection = () => {
  return (
    <div className="mt-[123px] w-full pt-8 pb-10 sm:py-12">
      <Wrapper>
        <MessageBubble messages={aboutMessages} />
      </Wrapper>
    </div>
  );
};

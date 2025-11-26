import { type SchemaTypeDefinition } from "sanity";
import { buttonType } from "./objects/button.object";
import { fieldType } from "./objects/field.object";
import { linkType } from "./objects/link.object";
import { messageContentType } from "./objects/msg-content.object";
import { messageType } from "./objects/msg.object";
import { routeType } from "./objects/route.object";
import { senderType } from "./objects/sender.object";
import { projectUrlType } from "./objects/project.object";

import { projectType } from "./documents/project.document";
import { messagesType } from "./documents/message.document";

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [
    messagesType,
    projectType,
    // Objects
    buttonType,
    projectUrlType,
    fieldType,
    linkType,
    messageContentType,
    messageType,
    routeType,
    senderType,
  ],
};

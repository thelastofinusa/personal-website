import type { StructureResolver } from "sanity/structure";

// https://www.sanity.io/docs/structure-builder-cheat-sheet
export const structure: StructureResolver = (S) =>
  S.list()
    .title("Messages")
    .items([
      S.documentTypeListItem("project").title("Projects"),
      S.divider(),
      S.documentTypeListItem("messages").title("Messages"),
      ...S.documentTypeListItems().filter(
        (item) =>
          item.getId() && !["messages", "project"].includes(item.getId()!),
      ),
    ]);

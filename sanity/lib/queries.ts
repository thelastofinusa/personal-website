import { groq } from "next-sanity";

export const homeMsgQuery = (page: "home" | "projects") => groq`
  *[_type == "messages" && page == "${page}"][0] {
    _id,
    page,
    messages[] {
      _key,
      sender {
        name,
        from,
        "avatar": avatar.asset->url,
      },
      content[] {
        _key,
        message,
        route,
        link {
          title,
          description,
          url,
          "image": image.asset->url,
        },
        buttons,
        fields,
        project -> {
          title,
          "slug": slug.current,
          description,
          featured,
          createdAt,
          urls[] {
            _key,
            label,
            url
          }
        }
      }
    }
  }
`;

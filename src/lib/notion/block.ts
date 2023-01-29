import {
  BlockObjectResponse,
  BulletedListItemBlockObjectResponse,
  CodeBlockObjectResponse,
  Heading1BlockObjectResponse,
  Heading2BlockObjectResponse,
  Heading3BlockObjectResponse,
  ImageBlockObjectResponse,
  ParagraphBlockObjectResponse,
  QuoteBlockObjectResponse,
} from "@notionhq/client/build/src/api-endpoints";
import { notion } from "@/lib/notion";

export const getContent = async (block_id: string): Promise<string> => {
  const children = await notion.blocks.children.list({ block_id });
  const childContent = (children.results as BlockObjectResponse[])
    .map((child: BlockObjectResponse) => {
      switch (child.type) {
        case "paragraph":
          return (child as ParagraphBlockObjectResponse).paragraph?.rich_text
            ?.map((text) => text.plain_text)
            .join(" ");

        case "heading_1":
          return (child as Heading1BlockObjectResponse).heading_1.rich_text
            ?.map((e) => e.plain_text)
            .join(" ");

        case "heading_2":
          return (child as Heading2BlockObjectResponse).heading_2.rich_text
            ?.map((e) => e.plain_text)
            .join(" ");
        case "heading_3":
          return (child as Heading3BlockObjectResponse).heading_3.rich_text
            ?.map((e) => e.plain_text)
            .join(" ");

        case "bulleted_list_item":
          return (
            child as BulletedListItemBlockObjectResponse
          ).bulleted_list_item.rich_text
            ?.map((e) => e.plain_text)
            .join(" ");
        case "image":
          return (child as ImageBlockObjectResponse).image.caption
            ?.map((e) => e.plain_text)
            .join(" ");
        case "code":
          return (child as CodeBlockObjectResponse).code?.rich_text
            ?.map((e) => e.plain_text)
            .join(" ");
        case "quote":
          return (child as QuoteBlockObjectResponse).quote.rich_text
            ?.map((e) => e.plain_text)
            .join(" ");
        default:
          return "";
      }
    })
    .join("\n");
  return childContent;
};

import { createClient } from "@sanity/client";
import imageUrlBuilder from "@sanity/image-url";

const client = createClient({
    projectId: "t8mpx5n1",
    dataset: "production",
    useCdn: true,
    apiVersion: "2023-05-03",
});
const builder = imageUrlBuilder(client);

// export const urlFor = (source) => builder.image(source);

export function urlFor(source) {
    return builder.image(source);
}

export default client;

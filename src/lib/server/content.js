export async function getWebsiteBySlug(pb, websiteSlug) {
  return await pb.collection('websites').getFirstListItem(
    `slug = "${websiteSlug}"`
  );
}

export async function getPageBySlug(pb, websiteId, pageSlug) {
  return await pb.collection('pages').getFirstListItem(
    `website = "${websiteId}" && slug = "${pageSlug}"`
  );
}

export async function getBlocksByPageId(pb, pageId) {
  const blocks = await pb.collection('blocks').getFullList({
    filter: `page = "${pageId}" && enabled = true`,
    expand: 'component',
    sort: 'created'
  });

  return blocks.map((block) => normalizeBlock(pb, block));
}

export function mapBlocksBySlot(blocks) {
  return Object.fromEntries(
    blocks.map((block) => [block.slot, block])
  );
}

function normalizeBlock(pb, block) {
  return {
    ...block,
    props: resolveAssetRefs(pb, block.props)
  };
}

function resolveAssetRefs(pb, value) {
  if (Array.isArray(value)) {
    return value.map((v) => resolveAssetRefs(pb, v));
  }

  if (value && typeof value === 'object') {
    if (isAssetRef(value)) {
      return buildAssetUrl(pb, value);
    }

    return Object.fromEntries(
      Object.entries(value).map(([key, val]) => [key, resolveAssetRefs(pb, val)])
    );
  }

  return value;
}

function isAssetRef(value) {
  return (
    value &&
    typeof value === 'object' &&
    typeof value.recordId === 'string' &&
    typeof value.filename === 'string' &&
    typeof value.collection === 'string'
  );
}

function buildAssetUrl(pb, fileRef) {
  return pb.files.getURL(
    {
      id: fileRef.recordId,
      collectionId: fileRef.collection,
      collectionName: fileRef.collection
    },
    fileRef.filename
  );
}

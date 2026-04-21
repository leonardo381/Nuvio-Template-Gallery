import {
  getWebsiteBySlug,
  getPageBySlug,
  getBlocksByPageId,
  mapBlocksBySlot
} from '$lib/server/content';
import { createContactRecord } from '$lib/server/contacts';
import { fail } from '@sveltejs/kit';

function asString(value) {
  return typeof value === 'string' ? value.trim() : '';
}

function isTrue(value) {
  return value === true;
}

function isContactFormEnabled(websiteSettings = {}) {
  const featureFlagEnabled = websiteSettings.featureFlags?.contactForm;
  const contactFormEnabled = websiteSettings.contactForm?.enabled;
  return featureFlagEnabled !== false && isTrue(contactFormEnabled);
}

function shouldRenderPhoneField(websiteSettings = {}) {
  return isTrue(websiteSettings.contactForm?.fields?.phone);
}

function isValidEmail(value) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

export async function load({ locals }) {
  const website = await getWebsiteBySlug(locals.pb, 'demo-site');
  const page = await getPageBySlug(locals.pb, website.id, 'features');
  const blocks = await getBlocksByPageId(locals.pb, page.id);

  return {
    blocksBySlot: mapBlocksBySlot(blocks),
    website: {
      id: website.id,
      slug: website.slug
    },
    websiteSettings: website.settings ?? {}
  };
}

export const actions = {
  contact: async ({ locals, request }) => {
    const website = await getWebsiteBySlug(locals.pb, 'demo-site');
    const websiteSettings = website.settings ?? {};

    if (!isContactFormEnabled(websiteSettings)) {
      return fail(403, {
        contactForm: {
          ok: false,
          error: 'Contact form is currently unavailable.',
          values: {}
        }
      });
    }

    const showPhoneField = shouldRenderPhoneField(websiteSettings);
    const formData = await request.formData();

    const values = {
      name: asString(formData.get('name')),
      email: asString(formData.get('email')),
      phone: asString(formData.get('phone')),
      message: asString(formData.get('message'))
    };

    const errors = {};

    if (!values.name) {
      errors.name = 'Name is required.';
    }

    if (!values.email) {
      errors.email = 'Email is required.';
    } else if (!isValidEmail(values.email)) {
      errors.email = 'Email is invalid.';
    }

    if (!values.message) {
      errors.message = 'Message is required.';
    }

    if (Object.keys(errors).length > 0) {
      return fail(400, {
        contactForm: {
          ok: false,
          errors,
          values
        }
      });
    }

    const result = await createContactRecord({
      website: website.id,
      name: values.name,
      email: values.email,
      phone: showPhoneField ? values.phone : '',
      message: values.message
    });

    if (!result.ok) {
      return fail(500, {
        contactForm: {
          ok: false,
          error: 'Unable to send your message right now. Please try again.',
          values
        }
      });
    }

    return {
      contactForm: {
        ok: true,
        message:
          asString(websiteSettings.contactForm?.confirmationMessage) ||
          'Your message has been sent successfully.'
      }
    };
  }
};

import {
	type ComputedFields,
	defineDocumentType,
	defineNestedType,
	makeSource,
} from "contentlayer/source-files";
import rehypeSlug from "rehype-slug";
import remarkGfm from "remark-gfm";

const computedFields: ComputedFields = {
	id: {
		type: "string",
		resolve(doc) {
			return doc._raw.flattenedPath.split("/").at(1);
		},
	},
};

const Category = defineDocumentType(() => ({
	name: "Category",
	filePathPattern: "categories/**/*.yml",
	contentType: "data",
	fields: {
		name: {
			type: "string",
			required: true,
		},
		description: {
			type: "string",
			required: true,
		},
		image: {
			type: "string",
			required: false,
		},
		host: {
			type: "string",
			required: false,
		},
	},
	computedFields,
}));

const ContentType = defineDocumentType(() => ({
	name: "ContentType",
	filePathPattern: "content-types/**/*.yml",
	contentType: "data",
	fields: {
		name: {
			type: "string",
			required: true,
		},
	},
	computedFields,
}));

const Curricula = defineDocumentType(() => ({
	name: "Curricula",
	filePathPattern: "curricula/**/*.mdx",
	contentType: "mdx",
	fields: {
		name: {
			type: "string",
			required: true,
		},
		shortTitle: {
			type: "string",
			required: false,
		},
		lang: {
			type: "enum",
			options: ["de", "en"],
			default: "en",
			required: true,
		},
		date: {
			type: "date",
			required: true,
		},
		version: {
			type: "string",
			default: "1.0.0",
			required: true,
		},
		editors: {
			type: "list",
			required: false,
			of: Person,
		},
		tags: {
			type: "list",
			required: true,
			of: Tag,
		},
		resources: {
			type: "list",
			required: true,
			of: Resource,
		},
		featuredImage: {
			type: "string",
			required: false,
		},
		abstract: {
			type: "string",
			required: true,
		},
	},
	computedFields,
}));

const DocumentationPage = defineDocumentType(() => ({
	name: "DocumentationPage",
	filePathPattern: "documentation/**/*.mdx",
	contentType: "mdx",
	fields: {
		title: {
			type: "string",
			required: true,
		},
		order: {
			type: "number",
			required: true,
		},
	},
	computedFields,
}));

const Event = defineDocumentType(() => ({
	name: "Event",
	filePathPattern: "events/**/*.mdx",
	contentType: "mdx",
	fields: {
		title: {
			type: "string",
			required: true,
		},
		shortTitle: {
			type: "string",
			required: false,
		},
		eventType: {
			type: "string",
			required: false,
		},
		lang: {
			type: "enum",
			options: ["de", "en"],
			default: "en",
			required: true,
		},
		date: {
			type: "date",
			required: true,
		},
		tags: {
			type: "list",
			required: true,
			of: Tag,
		},
		categories: {
			type: "list",
			default: ["events"],
			required: true,
			of: Category,
		},
		logo: {
			type: "string",
			required: false,
		},
		featuredImage: {
			type: "string",
			required: false,
		},
		abstract: {
			type: "string",
			required: true,
		},
		authors: {
			type: "list",
			required: false,
			of: Person,
		},
		about: {
			type: "mdx",
			required: true,
		},
		prep: {
			type: "mdx",
			required: false,
		},
		type: {
			type: "reference",
			default: "event",
			required: true,
			of: ContentType,
		},
		licence: {
			type: "reference",
			required: true,
			of: License,
		},
		partners: {
			type: "list",
			required: false,
			of: Organisation,
		},
		social: {
			type: "nested",
			required: false,
			of: EventSocial,
		},
		synthesis: {
			type: "string",
			required: false,
		},
		sessions: {
			type: "list",
			required: true,
			of: EventSession,
		},
	},
	computedFields,
}));

const EventSession = defineNestedType(() => ({
	name: "EventSession",
	fields: {
		title: {
			type: "string",
			required: true,
		},
		speakers: {
			type: "list",
			required: true,
			of: Person,
		},
		synthesis: {
			type: "string",
			required: false,
		},
		body: {
			type: "mdx",
			required: true,
		},
	},
}));

const EventSocial = defineNestedType(() => ({
	name: "EventSocial",
	fields: {
		website: {
			type: "string",
			required: false,
		},
		email: {
			type: "string",
			required: false,
		},
		twitter: {
			type: "string",
			required: false,
		},
		// flickr: {
		//   type: "string",
		//   required: false,
		// },
	},
}));

const HomePage = defineDocumentType(() => ({
	name: "HomePage",
	filePathPattern: "pages/home/index.mdx",
	contentType: "mdx",
	isSingleton: true,
	fields: {
		title: {
			type: "string",
			required: true,
		},
	},
}));

const ImprintPage = defineDocumentType(() => ({
	name: "ImprintPage",
	filePathPattern: "pages/imprint/index.mdx",
	contentType: "mdx",
	isSingleton: true,
	fields: {
		title: {
			type: "string",
			required: true,
		},
	},
}));

const License = defineDocumentType(() => ({
	name: "License",
	filePathPattern: "licenses/**/*.yml",
	contentType: "data",
	fields: {
		name: {
			type: "string",
			required: true,
		},
		url: {
			type: "string",
			required: true,
		},
	},
	computedFields,
}));

const Organisation = defineDocumentType(() => ({
	name: "Organisation",
	filePathPattern: "organisations/**/*.yml",
	contentType: "data",
	fields: {
		name: {
			type: "string",
			required: true,
		},
		url: {
			type: "string",
			required: false,
		},
		logo: {
			type: "string",
			required: false,
		},
	},
	computedFields,
}));

const Person = defineDocumentType(() => ({
	name: "Person",
	filePathPattern: "people/**/*.yml",
	contentType: "data",
	fields: {
		firstName: {
			type: "string",
			required: true,
		},
		lastName: {
			type: "string",
			required: true,
		},
		title: {
			type: "string",
			required: false,
		},
		description: {
			type: "string",
			required: false,
		},
		avatar: {
			type: "string",
			required: false,
		},
		email: {
			type: "string",
			required: false,
		},
		twitter: {
			type: "string",
			required: false,
		},
		website: {
			type: "string",
			required: false,
		},
		orcid: {
			type: "string",
			required: false,
		},
	},
	computedFields,
}));

const Resource = defineDocumentType(() => ({
	name: "Resource",
	filePathPattern: "resources/**/*.mdx",
	contentType: "mdx",
	fields: {
		title: {
			type: "string",
			required: true,
		},
		shortTitle: {
			type: "string",
			required: false,
		},
		lang: {
			type: "enum",
			options: ["de", "en"],
			default: "en",
			required: true,
		},
		date: {
			type: "date",
			required: true,
		},
		version: {
			type: "string",
			default: "1.0.0",
			required: true,
		},
		authors: {
			type: "list",
			required: true,
			of: Person,
		},
		editors: {
			type: "list",
			required: false,
			of: Person,
		},
		contributors: {
			type: "list",
			of: Person,
			required: false,
		},
		tags: {
			type: "list",
			required: true,
			of: Tag,
		},
		categories: {
			type: "list",
			required: true,
			of: Category,
		},
		featuredImage: {
			type: "string",
			required: false,
		},
		abstract: {
			type: "string",
			required: true,
		},
		domain: {
			type: "enum",
			options: ["Social Sciences and Humanities"],
			default: "Social Sciences and Humanities",
			required: true,
		},
		targetGroup: {
			type: "enum",
			options: [
				"Data managers",
				"Domain researchers",
				"Data service engineers",
				"Data scientists/analysts",
			],
			default: "Domain researchers",
			required: true,
		},
		type: {
			type: "reference",
			required: true,
			of: ContentType,
		},
		remote: {
			type: "nested",
			required: false,
			of: ResourceRemote,
		},
		licence: {
			type: "reference",
			required: true,
			of: License,
		},
		toc: {
			type: "boolean",
			default: false,
			required: false,
		},
		draft: {
			type: "boolean",
			default: false,
			required: false,
		},
	},
	computedFields,
}));

const ResourceRemote = defineNestedType(() => ({
	name: "ResourceRemote",
	fields: {
		date: {
			type: "date",
			required: false,
		},
		url: {
			type: "string",
			required: false,
		},
		publisher: {
			type: "string",
			required: false,
		},
	},
}));

const Tag = defineDocumentType(() => ({
	name: "Tag",
	filePathPattern: "tags/**/*.yml",
	contentType: "data",
	fields: {
		name: {
			type: "string",
			required: true,
		},
		description: {
			type: "string",
			required: true,
		},
	},
	computedFields,
}));

export default makeSource({
	contentDirPath: "content",
	documentTypes: [
		Category,
		ContentType,
		Curricula,
		DocumentationPage,
		Event,
		HomePage,
		ImprintPage,
		License,
		Organisation,
		Person,
		Resource,
		Tag,
	],
	mdx: {
		remarkPlugins: [remarkGfm],
		rehypePlugins: [rehypeSlug],
	},
});

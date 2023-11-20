import {
	allCategories,
	allContentTypes,
	allCurriculas as allCurricula,
	allDocumentationPages,
	allEvents,
	allLicenses,
	allOrganisations,
	allPeople,
	allResources,
	allTags,
	homePage,
	imprintPage,
} from "contentlayer/generated";

const collections = {
	categories: {
		list() {
			return Promise.resolve(allCategories.map((page) => page.id));
		},
		all() {
			return Promise.resolve(allCategories);
		},
		read(id: string) {
			return Promise.resolve(allCategories.find((entry) => entry.id === id));
		},
	},
	contentTypes: {
		list() {
			return Promise.resolve(allContentTypes.map((page) => page.id));
		},
		all() {
			return Promise.resolve(allContentTypes);
		},
		read(id: string) {
			return Promise.resolve(allContentTypes.find((entry) => entry.id === id));
		},
	},
	curricula: {
		list() {
			return Promise.resolve(allCurricula.map((page) => page.id));
		},
		all() {
			return Promise.resolve(allCurricula);
		},
		read(id: string) {
			return Promise.resolve(allCurricula.find((entry) => entry.id === id));
		},
	},
	documentation: {
		list() {
			return Promise.resolve(allDocumentationPages.map((page) => page.id));
		},
		all() {
			return Promise.resolve(allDocumentationPages);
		},
		read(id: string) {
			return Promise.resolve(allDocumentationPages.find((entry) => entry.id === id));
		},
	},
	events: {
		list() {
			return Promise.resolve(allEvents.map((page) => page.id));
		},
		all() {
			return Promise.resolve(allEvents);
		},
		read(id: string) {
			return Promise.resolve(allEvents.find((entry) => entry.id === id));
		},
	},
	licenses: {
		list() {
			return Promise.resolve(allLicenses.map((page) => page.id));
		},
		all() {
			return Promise.resolve(allLicenses);
		},
		read(id: string) {
			return Promise.resolve(allLicenses.find((entry) => entry.id === id));
		},
	},
	organisations: {
		list() {
			return Promise.resolve(allOrganisations.map((page) => page.id));
		},
		all() {
			return Promise.resolve(allOrganisations);
		},
		read(id: string) {
			return Promise.resolve(allOrganisations.find((entry) => entry.id === id));
		},
	},
	people: {
		list() {
			return Promise.resolve(allPeople.map((page) => page.id));
		},
		all() {
			return Promise.resolve(allPeople);
		},
		read(id: string) {
			return Promise.resolve(allPeople.find((entry) => entry.id === id));
		},
	},
	resources: {
		list() {
			return Promise.resolve(allResources.map((page) => page.id));
		},
		all() {
			return Promise.resolve(allResources);
		},
		read(id: string) {
			return Promise.resolve(allResources.find((entry) => entry.id === id));
		},
	},
	tags: {
		list() {
			return Promise.resolve(allTags.map((page) => page.id));
		},
		all() {
			return Promise.resolve(allTags);
		},
		read(id: string) {
			return Promise.resolve(allTags.find((entry) => entry.id === id));
		},
	},
};

const singletons = {
	home: {
		read() {
			return Promise.resolve(homePage);
		},
	},
	imprint: {
		read() {
			return Promise.resolve(imprintPage);
		},
	},
};

export function reader() {
	return {
		collections,
		singletons,
	};
}

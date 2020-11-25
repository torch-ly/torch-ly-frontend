import {apolloClient, logError} from "~/plugins/backendComunication/backendComunication";
import gql from "graphql-tag";

export async function getMonsters() {
	try {
		return await apolloClient.query({
			query: gql`
                {
                    getMonsters
                }`
		});
	} catch {
		logError();
	}
}

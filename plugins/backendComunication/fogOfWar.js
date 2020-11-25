import {recieveSyncronize} from "~/logic/stage/layers/fogofwar/main";
import {apolloClient, logError} from "~/plugins/backendComunication/backendComunication";
import gql from "graphql-tag";

export function setFogOfWar(polygons) {
	apolloClient.mutate({
		mutation: gql`
            mutation fogOfWar($polygons:JSON!){
                updateFogOfWar(json:$polygons) { polygons }
            }
		`,
		variables: {
			polygons: polygons
		}
	}).catch(logError);
}

export function getFogOfWar() {
	apolloClient.query({
		query: gql`
            {
                getFogOfWar { polygons }
            }`
	})
	.then(({data}) => recieveSyncronize(data.getFogOfWar.polygons))
	.catch(logError);
}

export function subscribeFogOfWar() {
	apolloClient.subscribe({
		query: gql`
            subscription {
                updateFogOfWar { polygons }
            }
		`
	}).subscribe({
		next({data}) {
			recieveSyncronize(data.updateFogOfWar.polygons);
		}
	});
}

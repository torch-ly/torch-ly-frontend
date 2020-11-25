import {apolloClient, logError} from "~/plugins/backendComunication/backendComunication";
import gql from "graphql-tag";
import {store} from "~/logic/stage/main";

export function getInitiative() {
	apolloClient.query({
		query: gql`
            {
                getInitiative {order}
            }
		`
	})
	.then(({data}) => {
		store.commit("character/setInitiativeOrder", data.getInitiative.order);
	})
	.catch(logError);
}

export function setInitiative() {
	apolloClient.mutate({
		mutation: gql`
            mutation setInitiative($order:JSON!){
                updateInitiative(order:$order) {order}
            }
		`,
		variables: {
			order: store.state.character.initiative
		}
	}).catch(logError);
}

export function addToInitiative(id, value) {
	apolloClient.mutate({
		mutation: gql`
            mutation addInitiative($id: String!, $value: Int!) {
                addToInitiative(id: $id, value: $value) {
                    order
                }
            }
		`,
		variables: {
			id, value
		}
	}).catch(logError);
}

export function subscribeInitiative() {
	apolloClient.subscribe({
		query: gql`
            subscription {
                updateInitiative {order}
            }
		`
	}).subscribe({
		next({data}) {
			store.commit("character/setInitiativeOrder", data.updateInitiative.order);
		}
	});
}

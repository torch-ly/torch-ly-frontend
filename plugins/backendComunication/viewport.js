import {apolloClient, logError} from "~/plugins/backendComunication/backendComunication";
import {stage, store} from "~/logic/stage/main";
import gql from "graphql-tag";
import devices from "~/enums/devices";
import {updateGrid} from "@/logic/stage/layers/grid/main";

export function getViewport() {
	apolloClient.query({
		query: gql`
            {
                getViewport {matrix}
            }`
	})
		.then(({data}) => {
			if (store.state.config.device === devices.TV || store.state.config.followDMScreen) {
				let matrix = data.getViewport;
				stage.scale(matrix.scale);
				stage.x(matrix.x);
				stage.y(matrix.y);
				updateGrid();
				stage.batchDraw();
			}
		})
		.catch(logError);
}

export function setViewport() {
	if (!store.state.authentication.gm)
		return;

	apolloClient.mutate({
		mutation: gql`
            mutation setViewport($matrix:JSON!){
                updateViewport(matrix:$matrix) { matrix }
            }
		`,
		variables: {
			matrix: {
				scale: stage.scale(),
				x: stage.x(),
				y: stage.y()
			}
		}
	}).catch(logError);
}

export function subscribeViewport() {
	apolloClient.subscribe({
		query: gql`
            subscription {
                updateViewport { matrix }
            }
		`
	}).subscribe({
		next({data}) {
			if (store.state.config.device === devices.TV || store.state.config.followDMScreen) {
				let matrix = data.updateViewport.matrix;
				stage.scale(matrix.scale);
				stage.x(matrix.x);
				stage.y(matrix.y);
				updateGrid();
				stage.batchDraw();
			}
		}
	});
}

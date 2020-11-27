import {apolloClient, logError} from "~/plugins/backendComunication/backendComunication";
import gql from "graphql-tag";
import {pointTo} from "@/logic/stage/layers/measure/pointer";

export function pointToPos(x, y, color) {
	apolloClient.mutate({
		mutation: gql`
            mutation pointTo($pointer:PointerInput!){
                pointTo(pointer:$pointer) {point {x y} color}
            }
		`,
		variables: {
			pointer: {
				point: {
					x: x,
					y: y
				},
				color: color
			}
		}
	}).catch(logError);
}

export function updatePointTo() {
	apolloClient.subscribe({
		query: gql`
            subscription {
                updatePointTo {point {x y} color}
            }
		`
	}).subscribe({
		next({data}) {
			pointTo(data.updatePointTo.point.x, data.updatePointTo.point.y, data.updatePointTo.color);
		}
	});
}

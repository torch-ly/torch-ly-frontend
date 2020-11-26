import {apolloClient, logError} from "~/plugins/backendComunication/backendComunication";
import gql from "graphql-tag";
import {addDrawingObject, removeDrawingObject} from "@/logic/stage/layers/drawing/penTool";
import {clearDrawing} from "@/logic/stage/layers/drawing/main";

export function addDrawing(object) {
	apolloClient.mutate({
		mutation: gql`
      mutation addDrawing($object:JSON!){
        addDrawing(object:$object)
      }
    `,
		variables: {
			object: object
		}
	}).catch(logError);
}

export function removeDrawing(id) {
	apolloClient.mutate({
		mutation: gql`
      mutation removeDrawing($id:String!){
        removeDrawing(id:$id)
      }
    `,
		variables: {
			id: id
		}
	}).catch(logError);
}

export function clearAllDrawings() {
	apolloClient.mutate({
		mutation: gql`
      mutation clearAllDrawings($args:Boolean){
        clearAllDrawings(args:$args)
      }
    `,
		variables: {
			args: true
		}
	}).catch(logError);
}

export function getAllDrawingObjects() {
	apolloClient.query({
		query: gql`
      {
        getAllDrawingObjects
      }`
	})
		.then(({data}) => {
			let objects = data.getAllDrawingObjects;
			for (let object of objects) 
				addDrawingObject(object);
			
		})
		.catch(logError);
}

export function subscribeDrawing() {
	apolloClient.subscribe({
		query: gql`
      subscription {
        updateDrawing
      }
    `
	}).subscribe({
		next({data}) {
			addDrawingObject(data.updateDrawing.object);
		}
	});
}

export function subscribeRemoveDrawing() {
	apolloClient.subscribe({
		query: gql`
      subscription {
        removeDrawing
      }
    `
	}).subscribe({
		next({data}) {
			removeDrawingObject(data.removeDrawing);
		}
	});
}

export function subscribeClearAllDrawings() {
	apolloClient.subscribe({
		query: gql`
      subscription {
        clearAllDrawings
      }
    `
	}).subscribe({
		next() {
			clearDrawing();
		}
	});
}

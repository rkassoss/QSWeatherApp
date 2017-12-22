var fieldSelections = {};

function getFieldSelections(fieldName){
    return new Promise(function(resolve, reject){
        if (fieldSelections[fieldName]){
            fieldSelections[fieldName].then(function(reply){
                resolve(reply.selections);
            })
        } else {
            fieldSelections[fieldName] = APP.createGenericObject( {
                selections: {
                    qStringExpression: "=GetFieldSelections(["+fieldName+"],',',1000)"
                },
                selectionsCount: {
                    qValueExpression: "=GetSelectedCount(["+fieldName+"])"
                }
            }).then(function(reply){
                reply.layoutSubscribe(function(layout){
                    reply.selections = layout.selections == '-' ? [] : layout.selections.split(',');
                    resolve(reply.selections);
                });
                return reply;
            })
        }
    });
};